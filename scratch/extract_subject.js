const sharp = require('sharp');
const path = require('path');

async function extractSubject() {
  const origPath = path.join(__dirname, 'original_og.png');
  
  // Extract photo region
  const { data, info } = await sharp(origPath)
    .extract({ left: 740, top: 50, width: 440, height: 530 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  const newBuf = Buffer.alloc(width * height * 4);

  // We want to isolate Sushant's cut-out photo (subject only) with transparent background
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Sample blue background pixels (b > 130 and b > r + 40) or white card outer pixels
      const isBg = (b > 130 && (b - r) > 35 && g > 65 && g < 190) || (r > 235 && g > 235 && b > 235);

      if (isBg) {
        newBuf[i] = 0;
        newBuf[i + 1] = 0;
        newBuf[i + 2] = 0;
        newBuf[i + 3] = 0; // transparent
      } else {
        newBuf[i] = r;
        newBuf[i + 1] = g;
        newBuf[i + 2] = b;
        newBuf[i + 3] = 255;
      }
    }
  }

  const subjectPng = await sharp(newBuf, {
    raw: { width, height, channels: 4 }
  })
    .trim()
    .png()
    .toBuffer();

  const subjectBase64 = `data:image/png;base64,${subjectPng.toString('base64')}`;

  // Build the complete SVG with:
  // 1. Top parent gradient line RESTORED across top of main container card (width 1060, height 6)
  // 2. ONLY 1 single light background overall for the photo container
  // 3. Top-left & Top-right corners: 0 (sharp). Bottom-left & Bottom-right: 24px rounded.
  // 4. Sushant's photo scaled & positioned with top clearance so hair is completely visible!

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Brand 3-Color Gradient (#0d99ff -> #1f9d5e -> #a78bfa) -->
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0d99ff" />
      <stop offset="50%" stop-color="#1f9d5e" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>

    <!-- Single Lighter Light-Brand Background Gradient for Photo Container -->
    <linearGradient id="singleLightBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0F9FF" />
      <stop offset="50%" stop-color="#F0FDF4" />
      <stop offset="100%" stop-color="#F5F3FF" />
    </linearGradient>

    <!-- Ambient Glow Blurs -->
    <radialGradient id="blueGlow" cx="15%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#0d99ff" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#0d99ff" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="greenGlow" cx="85%" cy="25%" r="45%">
      <stop offset="0%" stop-color="#1f9d5e" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#1f9d5e" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="purpleGlow" cx="50%" cy="85%" r="55%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0" />
    </radialGradient>

    <!-- Soft Glass Card Shadow -->
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.07" />
    </filter>

    <!-- Photo Container Clip: Sharp top corners (rx=0), rounded bottom corners (rx=24) -->
    <!-- Position: x=735, y=60, width=395, height=510 -->
    <!-- Path: M 735,60 L 1130,60 L 1130,546 A 24,24 0 0 1 1106,570 L 759,570 A 24,24 0 0 1 735,546 Z -->
    <clipPath id="photoTopFlatClip">
      <path d="M 735,60 L 1130,60 L 1130,546 A 24,24 0 0 1 1106,570 L 759,570 A 24,24 0 0 1 735,546 Z" />
    </clipPath>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="#F8FAFC" />
  
  <!-- Ambient Brand Color Blurs -->
  <circle cx="180" cy="140" r="380" fill="url(#blueGlow)" />
  <circle cx="1020" cy="200" r="400" fill="url(#greenGlow)" />
  <circle cx="600" cy="540" r="420" fill="url(#purpleGlow)" />

  <!-- Main Glass Container Card -->
  <rect x="70" y="60" width="1060" height="510" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#shadow)" />

  <!-- RESTORED TOP HORIZONTAL LINE STROKE IN BRAND GRADIENT COLOR -->
  <rect x="70" y="60" width="1060" height="6" rx="3" fill="url(#brandGradient)" />

  <!-- LEFT CONTENT BLOCK -->
  <!-- 1. Badges Row -->
  <g transform="translate(125, 120)">
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
  <text x="125" y="230" font-family="Satoshi, sans-serif" font-weight="800" font-size="56" fill="#001536" letter-spacing="-1">
    Sushant Kumar
  </text>

  <!-- 3. Subheading (Product Designer in 3-Color Brand Gradient!) -->
  <text x="125" y="286" font-family="Satoshi, sans-serif" font-weight="700" font-size="38" fill="url(#brandGradient)" letter-spacing="-0.5">
    Product Designer
  </text>

  <!-- 4. Body Text (in Figtree) -->
  <text x="125" y="348" font-family="Figtree, sans-serif" font-weight="500" font-size="20" fill="#475569">
    Designing money settlement dashboards, merchant onboarding,
  </text>
  <text x="125" y="380" font-family="Figtree, sans-serif" font-weight="500" font-size="20" fill="#475569">
    and design systems end-to-end alongside engineering.
  </text>

  <!-- 5. Footer Specs Divider & Items -->
  <line x1="125" y1="432" x2="690" y2="432" stroke="#F1F5F9" stroke-width="1.5" />
  
  <g transform="translate(125, 472)">
    <!-- Location (Noida, India) -->
    <text x="0" y="0" font-family="Figtree, sans-serif" font-weight="600" font-size="16" fill="#64748B">📍 Noida, India</text>
    <circle cx="130" cy="-5" r="2.5" fill="#CBD5E1" />

    <!-- Portfolio URL (skpux.in in SAME single color #64748B) -->
    <text x="150" y="0" font-family="Figtree, sans-serif" font-weight="600" font-size="16" fill="#64748B">🌐 skpux.in</text>
  </g>

  <!-- RIGHT COLUMN: PHOTO CONTAINER WITH ONLY 1 LIGHT BACKGROUND, FLAT TOP CORNERS (rx=0), ROUNDED BOTTOM CORNERS (rx=24) -->
  <g clip-path="url(#photoTopFlatClip)">
    <!-- SINGLE Lighter Overall Background for Full Photo Container (No darker second box!) -->
    <path d="M 735,60 L 1130,60 L 1130,546 A 24,24 0 0 1 1106,570 L 759,570 A 24,24 0 0 1 735,546 Z" fill="url(#singleLightBg)" />
    
    <!-- Subtle left divider border separating text and photo container -->
    <line x1="735" y1="60" x2="735" y2="570" stroke="#E2E8F0" stroke-width="1" />

    <!-- Sushant's Subject Photo scaled down & placed with clear top margin above hair -->
    <image href="${subjectBase64}" x="745" y="145" width="375" height="425" preserveAspectRatio="xMidYMin meet" />
  </g>
</svg>
`;

  const outputPath = path.join(__dirname, '../public/og.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log('Clean OG image generated successfully at:', outputPath);
}

extractSubject().catch(console.error);
