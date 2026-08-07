import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, '../gözlük resimleri');
const publicDest = path.resolve(__dirname, '../public/glasses');
const distDest = path.resolve(__dirname, '../dist/glasses');

export async function convertImages() {
  if (!fs.existsSync(srcDir)) {
    console.warn(`[image-converter] Source directory missing: ${srcDir}`);
    return;
  }

  // Ensure destination folders exist
  fs.mkdirSync(publicDest, { recursive: true });
  
  const files = fs.readdirSync(srcDir);
  const imageExtensions = new Set(['.jpg', '.jpeg', '.png']);

  console.log(`[image-converter] Scanning ${files.length} files...`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!imageExtensions.has(ext)) continue;

    const baseName = path.basename(file, ext);
    const srcPath = path.join(srcDir, file);
    
    // Target output filenames
    const destName = `${baseName}.webp`;
    const destPathPublic = path.join(publicDest, destName);
    const destPathDist = path.join(distDest, destName);

    // Convert only if destination does not exist or source is newer
    let shouldConvert = false;
    if (!fs.existsSync(destPathPublic)) {
      shouldConvert = true;
    } else {
      const srcStat = fs.statSync(srcPath);
      const destStat = fs.statSync(destPathPublic);
      if (srcStat.mtime > destStat.mtime) {
        shouldConvert = true;
      }
    }

    if (shouldConvert) {
      try {
        await sharp(srcPath)
          .webp({ quality: 80 })
          .toFile(destPathPublic);
        
        // If dist exists, also copy to dist immediately
        if (fs.existsSync(path.dirname(destPathDist))) {
          fs.copyFileSync(destPathPublic, destPathDist);
        }
        
        console.log(`[image-converter] Converted: ${file} -> ${destName}`);
      } catch (err) {
        console.error(`[image-converter] Error converting ${file}:`, err);
      }
    }
  }
}

// Allow running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  convertImages().then(() => console.log('[image-converter] Completed direct execution.'));
}
