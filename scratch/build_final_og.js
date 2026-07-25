const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processPhotoCard() {
  const origPath = path.join(__dirname, 'original_og.png');
  
  // Extract photo card region: x=760, y=100, w=410, h=420
  const photoBuffer = await sharp(origPath)
    .extract({ left: 760, top: 100, width: 410, height: 420 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = photoBuffer;
  const width = info.width;
  const height = info.height;

  // New RGBA buffer for recolored photo card
  const newBuf = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const t = y / height; // ratio 0 -> 1

    // Interpolate 3-color brand gradient vertically: #0d99ff -> #1f9d5e -> #a78bfa
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
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Detect background blue pixels in original photo card:
      // Typically blueish: b > 140, b > r + 40, g between 80 and 170
      const isBlueBg = (b > 130 && (b - r) > 40 && g > 70 && g < 185);

      if (isBlueBg) {
        // Swap original blue background for brand gradient background
        newBuf[i] = brandR;
        newBuf[i + 1] = brandG;
        newBuf[i + 2] = brandB;
        newBuf[i + 3] = a;
      } else {
        // Keep Sushant's portrait photo pixels intact
        newBuf[i] = r;
        newBuf[i + 1] = g;
        newBuf[i + 2] = b;
        newBuf[i + 3] = a;
      }
    }
  }

  const recoloredPhotoPng = await sharp(newBuf, {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toBuffer();

  const photoBase64 = `data:image/png;base64,${recoloredPhotoPng.toString('base64')}`;

  // SVG Template keeping the exact left text layout, brand fonts, 3-color accents
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Brand 3-Color Gradient (#0d99ff -> #1f9d5e -> #a78bfa) -->
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0d99ff" />
      <stop offset="50%" stop-color="#1f9d5e" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>

    <!-- Ambient Glow Blurs -->
    <radialGradient id="blueGlow" cx="20%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#0d99ff" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0d99ff" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="greenGlow" cx="80%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#1f9d5e" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#1f9d5e" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="purpleGlow" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0" />
    </radialGradient>

    <!-- Soft Glass Card Shadow -->
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.07" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="#F8FAFC" />
  
  <!-- Ambient Brand Color Blurs -->
  <circle cx="180" cy="140" r="380" fill="url(#blueGlow)" />
  <circle cx="1020" cy="200" r="400" fill="url(#greenGlow)" />
  <circle cx="600" cy="540" r="420" fill="url(#purpleGlow)" />

  <!-- Main Glass Container Card -->
  <rect x="70" y="60" width="1060" height="510" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#shadow)" />
  
  <!-- Top Brand Gradient Accent Line -->
  <rect x="70" y="60" width="1060" height="6" rx="3" fill="url(#brandGradient)" />

  <!-- LEFT CONTENT BLOCK -->
  <!-- 1. Badges Row -->
  <g transform="translate(120, 115)">
    <!-- Blue Badge -->
    <rect x="0" y="0" width="145" height="32" rx="16" fill="#E0F2FE" stroke="#BAE6FD" stroke-width="1" />
    <circle cx="16" cy="16" r="4" fill="#0d99ff" />
    <text x="28" y="21" font-family="Figtree, sans-serif" font-weight="700" font-size="12" fill="#0d99ff" letter-spacing="0.5">FINTECH UI</text>

    <!-- Green Badge -->
    <rect x="157" y="0" width="165" height="32" rx="16" fill="#E6F9F1" stroke="#A7F3D0" stroke-width="1" />
    <circle cx="173" cy="16" r="4" fill="#1f9d5e" />
    <text x="185" y="21" font-family="Figtree, sans-serif" font-weight="700" font-size="12" fill="#1f9d5e" letter-spacing="0.5">DESIGN TOKENS</text>

    <!-- Purple Badge -->
    <rect x="334" y="0" width="155" height="32" rx="16" fill="#F3ECFD" stroke="#DDD6FE" stroke-width="1" />
    <circle cx="350" cy="16" r="4" fill="#a78bfa" />
    <text x="362" y="21" font-family="Figtree, sans-serif" font-weight="700" font-size="12" fill="#8b5cf6" letter-spacing="0.5">2.4 YRS EXP</text>
  </g>

  <!-- 2. Heading (Name in Satoshi Bold) -->
  <text x="120" y="222" font-family="Satoshi, sans-serif" font-weight="800" font-size="52" fill="#001536" letter-spacing="-1">
    Sushant Kumar
  </text>

  <!-- 3. Subheading (UI/UX Designer in 3-Color Brand Gradient!) -->
  <text x="120" y="278" font-family="Satoshi, sans-serif" font-weight="700" font-size="35" fill="url(#brandGradient)" letter-spacing="-0.5">
    UI/UX Designer &amp; Product Specialist
  </text>

  <!-- 4. Body Text (in Figtree) -->
  <text x="120" y="340" font-family="Figtree, sans-serif" font-weight="500" font-size="19" fill="#475569">
    Designing money settlement dashboards, merchant onboarding,
  </text>
  <text x="120" y="372" font-family="Figtree, sans-serif" font-weight="500" font-size="19" fill="#475569">
    and design systems end-to-end alongside engineering.
  </text>

  <!-- 5. Footer Specs Divider & Items -->
  <line x1="120" y1="425" x2="710" y2="425" stroke="#F1F5F9" stroke-width="1.5" />
  
  <g transform="translate(120, 465)">
    <!-- Location -->
    <text x="0" y="0" font-family="Figtree, sans-serif" font-weight="600" font-size="15" fill="#64748B">📍 Noida, India</text>
    <circle cx="130" cy="-5" r="2.5" fill="#CBD5E1" />

    <!-- Current Role -->
    <text x="150" y="0" font-family="Figtree, sans-serif" font-weight="600" font-size="15" fill="#64748B">💼 Cash Friend Fintech</text>
    <circle cx="340" cy="-5" r="2.5" fill="#CBD5E1" />

    <!-- Portfolio URL with Highlight -->
    <text x="360" y="0" font-family="Satoshi, sans-serif" font-weight="700" font-size="15" fill="#0d99ff">🌐 skpux.in</text>
  </g>

  <!-- RIGHT COLUMN: ORIGINAL PHOTO CARD WITH BRAND GRADIENT BACKGROUND -->
  <g transform="translate(720, 105)">
    <image href="${photoBase64}" width="410" height="420" />
  </g>
</svg>
`;

  const outputPath = path.join(__dirname, '../public/og.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log('Final og.png generated successfully at:', outputPath);
}

processPhotoCard().catch(console.error);
