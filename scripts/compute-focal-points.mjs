/**
 * Analyzes every image in public/ using smartcrop-sharp and outputs
 * focal point data (object-position percentages) to src/data/focalPoints.json.
 *
 * Usage: node scripts/compute-focal-points.mjs
 */

import { readdir, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import smartcrop from "smartcrop-sharp";

const PUBLIC_DIR = "public";
const OUTPUT = "src/data/focalPoints.json";
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function main() {
  const files = await readdir(PUBLIC_DIR);
  const images = files.filter((f) => {
    const ext = f.substring(f.lastIndexOf(".")).toLowerCase();
    return IMAGE_EXTS.has(ext);
  });

  console.log(`Analyzing ${images.length} images...`);

  const results = {};
  let done = 0;

  // Process in batches of 8 for speed
  const BATCH = 8;
  for (let i = 0; i < images.length; i += BATCH) {
    const batch = images.slice(i, i + BATCH);
    await Promise.all(
      batch.map(async (filename) => {
        const filepath = join(PUBLIC_DIR, filename);
        try {
          // Get image dimensions
          const metadata = await sharp(filepath).metadata();
          const { width, height } = metadata;

          // Smartcrop wants a target crop size — use a square crop
          // to find the most interesting region
          const cropSize = Math.min(width, height);
          const result = await smartcrop.crop(filepath, {
            width: cropSize,
            height: cropSize,
          });

          const crop = result.topCrop;

          // Convert crop center to percentage-based object-position
          const centerX = crop.x + crop.width / 2;
          const centerY = crop.y + crop.height / 2;
          const posX = Math.round((centerX / width) * 100);
          const posY = Math.round((centerY / height) * 100);

          results[filename] = `${posX}% ${posY}%`;
          done++;
          process.stdout.write(`\r  ${done}/${images.length}`);
        } catch (err) {
          console.error(`\n  SKIP ${filename}: ${err.message}`);
          results[filename] = "50% 50%";
          done++;
        }
      })
    );
  }

  await writeFile(OUTPUT, JSON.stringify(results, null, 2));
  console.log(`\nDone! Wrote ${Object.keys(results).length} entries to ${OUTPUT}`);
}

main();
