const sharp = require('sharp');
const path = require('path');

async function extractPhoto() {
  // In 1200x630 OG image, the photo card is located at top-right
  // Let's crop x: 740, y: 70, width: 390, height: 490
  const croppedPhoto = await sharp('scratch/original_og.png')
    .extract({ left: 740, top: 70, width: 390, height: 490 })
    .toFile('scratch/cropped_photo_card.png');

  console.log('Cropped photo card extracted:', croppedPhoto);
}

extractPhoto().catch(console.error);
