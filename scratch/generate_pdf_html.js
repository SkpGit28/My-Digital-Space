const fs = require('fs');
const path = require('path');

const ogPngPath = path.join(__dirname, '../public/og.png');
const ogBase64 = fs.readFileSync(ogPngPath).toString('base64');

const metadataTsPath = path.join(__dirname, '../src/app/metadata.ts');
const metadataTsCode = fs.readFileSync(metadataTsPath, 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sushant Kumar — Portfolio Metadata Documentation</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      margin: 0;
      padding: 20px;
      background: #ffffff;
    }
    .header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0284c7;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #001536;
      margin: 0 0 6px 0;
    }
    .subtitle {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
    .section {
      margin-bottom: 30px;
    }
    h2 {
      font-size: 16px;
      font-weight: 700;
      color: #0284c7;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 6px;
      margin-top: 0;
      margin-bottom: 12px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 15px;
    }
    .card-label {
      font-size: 10px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .card-value {
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
      word-break: break-all;
    }
    .og-preview-box {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 12px;
      text-align: center;
      margin-top: 10px;
    }
    .og-preview-img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 15px;
      border-radius: 10px;
      font-family: "Cascadia Code", "Fira Code", Consolas, Monaco, monospace;
      font-size: 11px;
      line-height: 1.45;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      margin-top: 40px;
      border-top: 1px solid #e2e8f0;
      padding-top: 15px;
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <div class="header">
    <div class="badge">Production Config</div>
    <h1>Sushant Kumar — Portfolio Metadata Specification</h1>
    <p class="subtitle">Complete SEO, OpenGraph, JSON-LD Schema & Next.js App Router Metadata Documentation</p>
  </div>

  <div class="section">
    <h2>1. Core Site Configuration</h2>
    <div class="grid">
      <div class="card">
        <div class="card-label">Owner / Author</div>
        <div class="card-value">Sushant Kumar (Product Designer)</div>
      </div>
      <div class="card">
        <div class="card-label">Production Domain</div>
        <div class="card-value">https://skpux.in</div>
      </div>
      <div class="card">
        <div class="card-label">Primary Email</div>
        <div class="card-value">skponpurpose@gmail.com</div>
      </div>
      <div class="card">
        <div class="card-label">Location</div>
        <div class="card-value">Noida, India</div>
      </div>
      <div class="card">
        <div class="card-label">LinkedIn Profile</div>
        <div class="card-value">https://www.linkedin.com/in/skplovesdesign</div>
      </div>
      <div class="card">
        <div class="card-label">GitHub Repository</div>
        <div class="card-value">https://github.com/SkpGit28/My-Digital-Space</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>2. OpenGraph Social Preview Image (1200 x 630 px)</h2>
    <p style="font-size: 12px; color: #475569; margin-bottom: 8px;">
      Features signature 3-color brand gradient (#0d99ff &rarr; #1f9d5e &rarr; #a78bfa), Satoshi heading font, Figtree body font, full-bleed top accent stroke, and uncropped portrait image:
    </p>
    <div class="og-preview-box">
      <img src="data:image/png;base64,${ogBase64}" class="og-preview-img" alt="OpenGraph Preview Card" />
    </div>
  </div>

  <div style="page-break-before: always;"></div>

  <div class="section">
    <h2>3. Complete Source Code (src/app/metadata.ts)</h2>
    <pre><code>${metadataTsCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
  </div>

  <div class="footer">
    <span>Generated for Sushant Kumar</span>
    <span>https://skpux.in</span>
  </div>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'metadata_doc.html'), htmlContent);
console.log('HTML metadata doc generated at scratch/metadata_doc.html');
