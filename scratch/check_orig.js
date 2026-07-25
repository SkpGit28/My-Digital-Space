const sharp = require('sharp');
const path = require('path');

async function checkOriginal() {
  const meta = await sharp('scratch/original_og.png').metadata();
  console.log('Original OG Metadata:', meta);
}

checkOriginal().catch(console.error);
