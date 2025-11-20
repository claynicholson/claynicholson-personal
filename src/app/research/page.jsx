"use client";

import React from 'react'
import Tags from '../../components/tags'
import Footer from '../../components/footer'
import Link from 'next/link'

const ResearchPage = () => {
  return (
    <>
      <div className='text-center'>
        <h1 className='text-4xl font-bold gradient-blue mt-9'>Clay Nicholson</h1>
        <nav className='mt-6 mb-4'>
          <div className='flex justify-center gap-6 text-lg'>
            <Link href="/" className='hover:text-blue-400 transition-colors'>Home</Link>
            <Link href="/robotics" className='hover:text-blue-400 transition-colors'>Robotics</Link>
            <Link href="/hackclub" className='hover:text-blue-400 transition-colors'>Hack Club</Link>
            <Link href="/misc" className='hover:text-blue-400 transition-colors'>Misc Projects</Link>
            <Link href="/research" className='hover:text-blue-400 transition-colors'>Research</Link>
            <Link href="/blog" className='hover:text-blue-400 transition-colors'>Blog</Link>
          </div>
        </nav>
      </div>

      <div className='px-20 max-w-7xl mx-auto'>
        <section id='research'>
          <h1 className='text-2xl font-bold mt-10 mb-10'>Research</h1>
          <div className='space-y-8'>

            <div className='border-l-2 border-blue-500 pl-6'>
              <h3 className='text-xl text-yellow-300 font-bold mb-2'>The development of a 3D U-Net model for pancreatic tumor segmentation in computed tomography scans</h3>
              <p className='text-sm text-gray-400 mb-3'>2024 - Present</p>
              <p className='text-gray-300 mb-3'>Pancreatic cancer has a low five-year survival rate (less than 11%), with only 9.7% detected early due to its subtle presentation in imaging. Pancreatic carcinoma typically appears as a poorly enhancing, hypodense mass in the arterial phase, making accurate segmentation and early diagnosis challenging. Traditional radiological methods rely on expert interpretation, which are time-intensive, subject to variability, and often limited in availability. This research provides an alternate approach for pancreatic cancer segmentation using a U-Net, a CNN architecture. By leveraging publicly available data from the Memorial Sloan Kettering Cancer Center, which consists of 420 fully annotated 3D volumes, the model learned to segment pancreatic cancer using just a CT scan. The model consists of 34 layers and 1,940,817 trainable parameters, trained on 282 3D CT volumes capturing diverse tumor morphologies. Eight trials were performed to fine-tune hyperparameters, including learning rates, batch sizes, and augmentation strategies for optimal performance. A Hounsfield filter with a -50 to 200 HU range was used to increase accuracy. Multi-stage training with RAdam and batch normalization improved convergence and accuracy by stabilizing learning and enhancing generalization. The final model slightly outperformed trained radiologists in segmentation accuracy and significantly exceeded them in segmentation speed.. This model has the potential to increase the five-year survival rate, improve accessibility, and reduce variability in the diagnosis and treatment of pancreatic cancer. Future work will focus on integrating multi-modal imaging techniques, and optimizing real-time clinical deployment to further improve early detection.</p>

              <p className='text-yellow-300 mb-3'>That was a lot so here is the TLDR:</p>
              <p className='text-gray-300 mb-3'>Pancreatic cancer is really bad. A large part of the reason is that it usually goes undetectd until it's too late. This project allows the detection of the cancer to be greatly automated reducing the amount of time and money it takes to get regular pancreas scans. </p>
              <p className='text-gray-300 mb-3'>The heart of this project is a <a href="https://en.wikipedia.org/wiki/U-Net" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">U-Net model</a>. Using this architecture (which is really simple if you look into it) I was able to make a program which could take in 128x128 images and output 128x128 segmentation masks. Medical segmentation accuracy (and maybe other things tbh) is measured with the DICE coefficent. Which is just the amount of overlap between two blobs. My model got a DICE of 0.7451, better than most radiolosts and most programs trained on CT scans.</p>

              <p className='text-yellow-300 mb-3'>People who thought this was cool for some reason:</p>
              <ul className='list-disc list-inside text-gray-300 space-y-2 mb-3'>
                <li>
                  <a href="https://www.societyforscience.org/press-release/regeneron-isef-2025-full-awards/" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">My name is on here somewhere...</a>
                </li>
                <li>
                  <a href="https://www.wcax.com/2025/04/29/cvu-student-takes-cancer-research-science-project-next-level/" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">TY WCAX...</a>
                </li>
                <li>
                  <a href="https://www.willistonobserver.com/news/williston/around_town/around-town-for-april-10-2025/article_faab7df6-7946-4567-8048-d141d215f99b.html" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">Da News...</a>
                </li>
                <li>
                  <a href="https://www.vtcng.com/thecitizenvt/community/school_news/cvu-student-earns-spot-in-international-stem-competition/article_6942b336-d6d2-49c6-84c2-644101a37d3d.html" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">Same article different news...</a>
                </li>
              </ul>

              <p className='text-yellow-300 mb-3'>Good Reads:</p>
              <ul className='list-disc list-inside text-gray-300 space-y-2 mb-3'>
                <li>
                  <a href="https://www.uclahealth.org/news/article/pancreatic-cancer-is-almost-impossible-to-detect-early
" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">https://www.uclahealth.org/news/article/pancreatic-cancer-is-almost-impossible-to-detect-early
                  </a>
                </li>
                <li>
                  <a href="https://www.wcax.com/2025/04/29/cvu-student-takes-cancer-research-science-project-next-level/" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">TY WCAX...</a>
                </li>
                <li>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5960811/" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC5960811/</a>
                </li>
                <li>
                  <a href="https://arxiv.org/pdf/1505.04597" className='underline text-blue-400 hover:text-blue-300' target="_blank" rel="noopener noreferrer">https://arxiv.org/pdf/1505.04597</a>
                </li>
              </ul>

            </div>

            <div className='border-l-2 border-blue-500 pl-6'>
              <h3 className='text-xl text-yellow-300 font-bold mb-2'>Whats Next?</h3>
              <p className='text-sm text-gray-400 mb-3'>NOW</p>
              <p className='text-gray-300 mb-3'>I am currently looking into advanced IC packaging technologies and using chiplets to improve yield, performance, all that good stuff. I am also working at the UVM INTERACT lab and am hopefully going to have some cool creppy crawly robots.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ResearchPage
