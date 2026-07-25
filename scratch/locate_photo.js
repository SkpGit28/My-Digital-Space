const sharp = require('sharp');

async function locatePhoto() {
  const { data, info } = await sharp('scratch/original_og.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Let's sample pixels across x=700 to 1100, y=100 to 500 to find non-white background
  let foundX = 0, foundY = 0;
  for (let y = 50; y < 580; y += 20) {
    for (let x = 700; x < 1150; x += 20) {
      const i = (y * width + x) * 3;
      const r = data[i], g = data[i+1], b = data[i+2];
      // Check if it's blueish (b > 150 and b > r + 30)
      if (b > 150 && b > r + 30) {
        console.log(`Blue background detected at x=${x}, y=${y}: RGB(${r}, ${g}, ${b})`);
      }
    }
  }
}

locatePhoto().catch(console.error);
