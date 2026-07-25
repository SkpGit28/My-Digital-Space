const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Read HeroMe.svg to embed in OG image if needed, or use styled vector card
const heroSvgPath = path.join(__dirname, '../public/HeroMe.svg');
let heroSvgContent = '';
if (fs.existsSync(heroSvgPath)) {
  heroSvgContent = fs.readFileSync(heroSvgPath, 'utf8');
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Brand 3-Color Gradient (#0d99ff -> #1f9d5e -> #a78bfa) -->
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0d99ff" />
      <stop offset="50%" stop-color="#1f9d5e" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>

    <!-- Subtle Ambient Glow Filters -->
    <radialGradient id="blueGlow" cx="20%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#0d99ff" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#0d99ff" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="greenGlow" cx="80%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#1f9d5e" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#1f9d5e" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="purpleGlow" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0" />
    </radialGradient>

    <!-- Soft Glass Card Shadow -->
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.07" />
    </filter>

    <clipPath id="avatarClip">
      <rect x="790" y="145" width="260" height="340" rx="20" />
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
  
  <!-- Top Brand Gradient Accent Line -->
  <rect x="70" y="60" width="1060" height="6" rx="3" fill="url(#brandGradient)" />

  <!-- LEFT CONTENT BLOCK -->
  <!-- 1. Badges Row -->
  <g transform="translate(130, 115)">
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
  <text x="130" y="222" font-family="Satoshi, sans-serif" font-weight="800" font-size="54" fill="#001536" letter-spacing="-1">
    Sushant Kumar
  </text>

  <!-- 3. Subheading (UI/UX Designer in 3-Color Brand Gradient!) -->
  <text x="130" y="278" font-family="Satoshi, sans-serif" font-weight="700" font-size="36" fill="url(#brandGradient)" letter-spacing="-0.5">
    UI/UX Designer &amp; Product Specialist
  </text>

  <!-- 4. Body Text (in Figtree) -->
  <text x="130" y="340" font-family="Figtree, sans-serif" font-weight="500" font-size="20" fill="#475569">
    Designing money settlement dashboards, merchant onboarding,
  </text>
  <text x="130" y="372" font-family="Figtree, sans-serif" font-weight="500" font-size="20" fill="#475569">
    and design systems end-to-end alongside engineering.
  </text>

  <!-- 5. Footer Specs Divider & Items -->
  <line x1="130" y1="425" x2="730" y2="425" stroke="#F1F5F9" stroke-width="1.5" />
  
  <g transform="translate(130, 465)">
    <!-- Location -->
    <text x="0" y="0" font-family="Figtree, sans-serif" font-weight="600" font-size="16" fill="#64748B">📍 Noida, India</text>
    <circle cx="140" cy="-5" r="2.5" fill="#CBD5E1" />

    <!-- Current Role -->
    <text x="160" y="0" font-family="Figtree, sans-serif" font-weight="600" font-size="16" fill="#64748B">💼 Cash Friend Fintech</text>
    <circle cx="355" cy="-5" r="2.5" fill="#CBD5E1" />

    <!-- Portfolio URL with Highlight -->
    <text x="375" y="0" font-family="Satoshi, sans-serif" font-weight="700" font-size="16" fill="#0d99ff">🌐 skpux.in</text>
  </g>

  <!-- RIGHT COLUMN: AVATAR CARD WITH 3-COLOR GRADIENT BORDER -->
  <g>
    <!-- Outer 3-Color Gradient Border Frame -->
    <rect x="786" y="116" width="268" height="398" rx="24" fill="none" stroke="url(#brandGradient)" stroke-width="4" />

    <!-- Inner Background Container -->
    <rect x="790" y="120" width="260" height="390" rx="20" fill="#F1F5F9" />

    <!-- Profile Image (HeroMe.svg or fallback vector) -->
    <g clip-path="url(#avatarClip)">
      <rect x="790" y="120" width="260" height="390" fill="#E2E8F0" />
      <image href="data:image/svg+xml;utf8,${encodeURIComponent(heroSvgContent)}" x="790" y="120" width="260" height="390" preserveAspectRatio="xMidYMid slice" />
    </g>
    
    <!-- Floating Portfolio Pill -->
    <rect x="850" y="475" width="140" height="28" rx="14" fill="#001536" />
    <text x="920" y="493" font-family="Figtree, sans-serif" font-weight="700" font-size="11" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">SKP PORTFOLIO</text>
  </g>
</svg>
`;

async function render() {
  const outputPath = path.join(__dirname, '../public/og.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 100 })
    .toFile(outputPath);
  console.log('og.png generated successfully at:', outputPath);
}

render().catch(console.error);
