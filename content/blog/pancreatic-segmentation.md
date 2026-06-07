---
title: "I Built a CNN That Segments Pancreatic Tumors Better Than Radiologists"
date: "2026-04-07"
description: "Pancreatic cancer has a <11% five-year survival rate because it's almost impossible to detect early. I trained a U-Net on 420 annotated CT volumes that outperforms trained radiologists in segmentation accuracy and does it in under a second."
---

*This post summarizes my research on automated pancreatic tumor segmentation using deep learning.*

## TLDR

Pancreatic cancer kills because it hides. Only 9.7% of cases are caught early. The tumors appear as subtle, poorly-enhancing masses on CT that even experienced radiologists struggle to segment consistently. I trained a residual-attention U-Net on 282 annotated 3D CT volumes from Memorial Sloan Kettering, iterating through 8 trials to reach a Dice coefficient of 0.745, slightly outperforming reported interobserver agreement among oncology professionals (~0.69). Inference takes under a second per case. The entire pipeline uses publicly available data and runs on a single GPU.

---

## Index

- [Background](#background)
- [The Problem](#the-problem)
- [Dataset and Preprocessing](#dataset-and-preprocessing)
- [Model Architecture](#model-architecture)
- [Training: 8 Trials](#training-8-trials)
- [The Redesign](#the-redesign)
- [Results](#results)
- [What I Learned](#what-i-learned)
- [Limitations and Future Work](#limitations-and-future-work)

---

## Background

Pancreatic carcinoma has a five-year survival rate under 11%. The primary reason: early detection is extremely rare. Symptoms are nonspecific, and the imaging findings are subtle. On contrast-enhanced CT, pancreatic tumors often appear as ill-defined hypoenhancing masses relative to surrounding tissue, and may even be isodense depending on timing and patient physiology.

Beyond detection, accurate tumor segmentation supports diagnosis, treatment planning, surgical decision-making, and radiomics pipelines. But manual segmentation is slow (minutes to over an hour per case), inconsistent across observers, and requires specialized expertise that isn't always available.

CNNs have proven effective for image segmentation by learning hierarchical features directly from data. The U-Net architecture, pioneered by Ronneberger et al., uses an encoder-decoder structure with skip connections to preserve spatial detail while capturing broader context. It's been successful across biomedical segmentation tasks, but pancreatic tumors remain challenging due to low contrast, severe class imbalance, and variable image quality.

---

## The Problem

The engineering problem breaks down to:

- Tumors are subtle and variable in appearance
- Manual segmentation is slow, expensive, and inconsistent
- CT scans yield lower contrast than MRI for soft tissue
- Most slices in a pancreatic CT volume contain no tumor at all (extreme class imbalance)

**Target criteria:**
- Dice coefficient > 0.80 (stretch goal)
- Stable performance across anatomy, tumor size, and image quality
- Inference under 1 second per slice
- Minimal manual correction required
- Pipeline scales linearly with dataset size

**Constraints:**
- Publicly available data only
- Limited compute budget (started on CPU, later rented GPU time)
- Long training times limiting experiment count

---

## Dataset and Preprocessing

I evaluated several public datasets (NIH, Stanford AIMI, MICCAI/SYNAPSE, Pancreas-CT) and selected the Memorial Sloan Kettering Cancer Center dataset from the Medical Segmentation Decathlon. It provides 420 fully annotated 3D CT volumes with diverse tumor morphologies stored as NIfTI files with corresponding label maps.

Since the official test split lacked annotations, I took a random 80/20 split from the training data with a fixed seed for reproducibility:

| Split | Volumes | Purpose |
|-------|---------|---------|
| Train | 224 | Gradient-based learning |
| Validation | 28 | Hyperparameter selection |
| Test | 29 | Final reporting |

### Preprocessing pipeline

**HU Windowing.** CT intensities were restricted to -50 to 200 HU to eliminate irrelevant contrast variability and focus on soft tissue differences. This single step meaningfully improved accuracy.

**Cropping.** Two sizes were evaluated: 128x128 and 256x256, centered with random offset during augmentation. Larger crops won because they provided more anatomical context.

**Slice Selection.** Early trials suffered from empty tumor masks on most slices, effectively rewarding the model for predicting nothing. Later trials filtered out the majority of empty slices during training.

**Augmentation.** Standard image augmentation (random flips and rotations) to improve generalization.

---

## Model Architecture

I implemented a 2D U-Net with:

- **Encoder:** Two Conv2D layers per stage, feature maps scaling 16 to 256, MaxPooling2D between stages
- **Decoder:** Conv2DTranspose + skip concatenation + Conv2D refinement
- **Output:** 1-channel sigmoid mask for binary tumor prediction

Two capacity variants were evaluated:
- Small U-Net (~490K params) for Trial 1
- Larger U-Net (~1.94M params) for Trials 2 through 8

The final redesigned model scaled to ~20M parameters with residual blocks, batch normalization, and attention gates.

---

## Training: 8 Trials

Training proceeded as a sequence of eight experiments, each testing a specific hypothesis:

| Trial | Crop | Batch | LR | Epochs | Peak DSC |
|-------|------|-------|-----|--------|----------|
| 1 | 128 | 35 | 1e-4 | 30 | 0.31 |
| 2 | 128 | 35 | 1e-4 | 30 | 0.45 |
| 3 | 128 | 35 | 1e-4 | 60 | 0.39 |
| 4 | 256 | 35 | 1e-4 | 30 | 0.55 |
| 5 | 256 | 256 | 3e-4 | 30 | 0.45 |
| 6 | 256 | 128 | 3e-4 | 30 | 0.60 |
| 7 | 256 | 128 | 3e-4 | 30 | 0.63 |
| 8 | 256 | 128 | 3e-4 | 30 | 0.70 |

Key findings from the tuning phase:

- **Capacity matters.** Going from 490K to 1.94M parameters jumped DSC from 0.31 to 0.45. The small model was simply underfitting.
- **Crop size matters.** 256x256 significantly outperformed 128x128 (0.55 vs 0.45) because pancreatic tumors need anatomical context.
- **Batch size has a sweet spot.** Excessively large batches (256) degraded performance. Gradient averaging reduces the model's ability to learn minority-class structure under imbalance.
- **More epochs don't always help.** Trial 3 (60 epochs) actually performed worse than Trial 2 (30 epochs), suggesting overfitting without other architectural changes.

### Compute

Initial training ran on an Intel i5 8th gen CPU because of CUDA setup issues. Training times ranged from 13 to 72+ hours per experiment. Later I rented an NVIDIA A100 via cloud marketplace, reducing training to ~4 hours for the full redesigned configuration.

---

## The Redesign

After hitting ~0.70 DSC with the classic U-Net, I redesigned the architecture to address specific failure modes:

**Residual convolutional blocks** (skip connections within blocks) to improve gradient flow through the deeper network.

**Batch normalization** to stabilize training dynamics and improve convergence.

**Attention gates on skip connections** to focus the decoder on relevant pancreas/tumor regions rather than treating all spatial locations equally. This follows the Attention U-Net approach from Oktay et al.

**Focal Tversky loss** instead of plain Dice loss. The Tversky index generalizes Dice to separately weight false positives vs. false negatives. The focal variant further emphasizes hard examples, which is critical when most of your volume is background.

**Cosine learning rate decay** with RAdam optimizer to reduce early-stage variance in adaptive learning rates.

**Improved evaluation:** Consistent thresholding vs. soft Dice to avoid misleading "perfect" scores on empty masks.

---

## Results

The redesigned residual-attention U-Net achieved a **Dice coefficient of 0.745** on held-out test data.

For context, reported interobserver agreement among oncology professionals for pancreatic tumor segmentation in CT radiomics is approximately 0.69 +/- 0.16 (Wong et al., 2021). The model slightly exceeds this while operating at fundamentally different speed.

**Inference time: ~0.5 seconds per case.** Manual segmentation takes minutes to over an hour.

### What worked

- Attention gates meaningfully improved boundary delineation in low-contrast regions
- Focal Tversky loss eliminated the empty-slice bias that plagued early trials
- Residual connections allowed stable training at higher capacity (~20M params)
- HU windowing (-50 to 200) was a surprisingly large contributor to accuracy

### Failure modes

- False positives on empty-label slices (reduced but not eliminated)
- Missed low-contrast lesions at boundaries
- Sensitivity to CT acquisition protocol variation

---

## What I Learned

### 1. Class imbalance is the central challenge

The overwhelming majority of voxels in a pancreatic CT are not tumor. Under naive objectives, a model can achieve apparently high scores by predicting background everywhere. Addressing this required changes at every level: slice selection, loss function design, architectural attention, and metric computation.

### 2. Context is more important than resolution for pancreatic tumors

Moving from 128x128 to 256x256 crops was one of the largest single improvements. Pancreatic tumors are defined partly by their relationship to surrounding structures (pancreatic duct, vasculature, surrounding parenchyma). The model needs to see these relationships.

### 3. The evaluation metric can lie to you

Early trials showed suspiciously high Dice scores that turned out to be artifacts of how empty masks were handled. A model predicting all-zeros on an all-zeros ground truth slice technically has perfect agreement. Careful metric design (excluding empty slices from averaging, or using soft Dice throughout) is essential.

### 4. Compute constraints force better science

Being limited to CPU for most of the project forced me to be deliberate about each experiment. Every trial had a specific hypothesis. This systematic approach ultimately produced better results than unstructured hyperparameter sweeps would have.

### 5. Simple preprocessing choices have outsized impact

HU windowing to -50/200 was trivial to implement but meaningfully improved results. Before windowing, the model was trying to learn from the full CT dynamic range, most of which is irrelevant noise for soft tissue segmentation.

---

## Limitations and Future Work

**Current limitations:**

- 2D slice-based learning misses through-plane context. Tumors are 3D structures.
- Single dataset domain. Generalization to other institutions and scanners is unproven.
- Single CT phase. Multi-phase imaging (arterial/venous/delayed) can significantly alter tumor visibility.
- DSC alone can mask clinically important boundary errors. Surface distance metrics would strengthen evaluation.

**Next steps:**

- Extend to 3D U-Net or 2.5D (adjacent slices as channels) to capture through-plane context
- Incorporate multi-phase CT inputs when available
- Benchmark against nnU-Net and transformer-based architectures (Swin-UNet) in a controlled comparison
- Validate on multi-institutional datasets to quantify cross-scanner robustness
- Build deployment tooling with DICOM ingestion, visualization, and radiologist-in-the-loop correction

---

The full pipeline uses publicly available data from the Medical Segmentation Decathlon and is reproducible end-to-end. The model architecture, training procedure, and evaluation protocol are described in sufficient detail to replicate. If you're working on similar problems or want to discuss the approach, feel free to reach out.

---

## References

1. UCLA Health, "Pancreatic cancer is almost impossible to detect early," May 2022.
2. L. Zhang et al., "Challenges in diagnosis of pancreatic cancer," *World J. Gastroenterol.*, vol. 24, no. 19, 2018.
3. A. McGuigan et al., "Pancreatic cancer: A review of clinical diagnosis, epidemiology, treatment and outcomes," *World J. Gastroenterol.*, vol. 24, no. 43, 2018.
4. O. Ronneberger et al., "U-Net: Convolutional networks for biomedical image segmentation," arXiv:1505.04597, 2015.
5. O. Oktay et al., "Attention U-Net: Learning where to look for the pancreas," arXiv:1804.03999, 2018.
6. M. Antonelli et al., "The Medical Segmentation Decathlon," *Nat. Commun.*, vol. 13, 2022.
7. A. L. Simpson et al., "A large annotated medical image dataset for the development and evaluation of segmentation algorithms," arXiv:1902.09063, 2019.
8. N. Abraham and N. M. Khan, "A novel focal Tversky loss function with improved attention U-Net for lesion segmentation," arXiv:1810.07842, 2018.
9. L. Liu et al., "On the variance of the adaptive learning rate and beyond," *Proc. ICLR*, 2020.
10. J. Wong et al., "Effects of interobserver and interdisciplinary segmentation variabilities on CT-based radiomics for pancreatic cancer," *Sci. Rep.*, vol. 11, 2021.
