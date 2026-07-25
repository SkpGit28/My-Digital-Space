const sharp = require('sharp');
const path = require('path');

async function recolorPhotoCard() {
  const { data, info } = await sharp('scratch/cropped_photo_card.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // We want to create a brand gradient background:
  // Color 1: #0d99ff (13, 153, 255)
  // Color 2: #1f9d5e (31, 157, 94)
  // Color 3: #a78bfa (167, 139, 250)

  // Create a brand gradient buffer for 390x490
  const gradientBg = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  });

  // Let's inspect background color at top-left of the photo card (x=10, y=10)
  const idxTL = (10 * width + 10) * channels;
  const bgR = data[idxTL];
  const bgG = data[idxTL + 1];
  const bgB = data[idxTL + 2];
  console.log(`Blue background sampled RGB: (${bgR}, ${bgG}, ${bgB})`);

  // Create new RGBA pixel buffer
  const newBuf = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const t = y / height; // vertical ratio 0 -> 1

    // Interpolate brand gradient vertically from #0d99ff (top) -> #1f9d5e (mid) -> #a78bfa (bottom)
    let brandR, brandG, brandB;
    if (t < 0.5) {
      const factor = t / 0.5;
      brandR = Math.round(13 + (31 - 13) * factor);
      brandG = Math.round(153 + (157 - 153) * factor);
      brandB = Math.round(255 + (94 - 255) * factor);
    } else {
      const factor = (t - 0.5) / 0.5;
      brandR = Math.round(31 + (167 - 31) * factor);
      brandG = Math.round(157 + (139 - 157) * factor);
      brandB = Math.round(94 + (250 - 94) * factor);
    }

    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const outI = (y * width + x) * 4;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Distance from sampled background blue color
      const dist = Math.sqrt(
        Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
      );

      if (dist < 45) {
        // Replace blue background with brand gradient
        newBuf[outI] = brandR;
        newBuf[outI + 1] = brandG;
        newBuf[outI + 2] = brandB;
        newBuf[outI + 3] = 255;
      } else if (dist < 75) {
        // Smooth anti-aliased edge blend
        const alpha = (dist - 45) / (75 - 45);
        newBuf[outI] = Math.round(brandR * (1 - alpha) + r * alpha);
        newBuf[outI + 1] = Math.round(brandG * (1 - alpha) + g * alpha);
        newBuf[outI + 2] = Math.round(brandB * (1 - alpha) + b * alpha);
        newBuf[outI + 3] = 255;
      } else {
        // Keep Sushant's photo subject pixel
        newBuf[outI] = r;
        newBuf[outI + 1] = g;
        newBuf[outI + 2] = b;
        newBuf[outI + 3] = 255;
      }
    }
  }

  await sharp(newBuf, {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toFile('scratch/recolored_photo_card.png');

  console.log('Recolored photo card created successfully!');
}

recolorPhotoCard().catch(console.error);
