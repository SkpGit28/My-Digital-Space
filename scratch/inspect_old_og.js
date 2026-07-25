const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function inspectOldOg() {
  const metadata = await sharp('scratch/old_og.png').metadata();
  console.log('Old OG Metadata:', metadata);
}

inspectOldOg();
