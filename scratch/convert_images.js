const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");

const filesToConvert = [
  "mockups/CardMockup.svg",
  "assets/Standardform.svg"
];

async function convert() {
  for (const file of filesToConvert) {
    const inputPath = path.join(publicDir, file);
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const outputPath = path.join(path.dirname(inputPath), `${baseName}.webp`);

    if (fs.existsSync(inputPath)) {
      console.log(`Converting ${file} to WebP...`);
      try {
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
        console.log(`Successfully converted ${file} -> ${baseName}.webp`);
      } catch (e) {
        console.error(`Failed to convert ${file}:`, e);
      }
    } else {
      console.log(`Skipped: ${file} not found.`);
    }
  }
}

convert();
