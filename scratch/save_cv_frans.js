const fs = require('fs');
const path = require('path');

const outputFile = 'C:\\Users\\Sushant Kumar\\.gemini\\antigravity\\brain\\58600a4f-ee5d-473f-9454-3f11560dc5e1\\.system_generated\\steps\\11853\\output.txt';
const rawText = fs.readFileSync(outputFile, 'utf8');

const jsonMatch = JSON.parse(rawText);

if (jsonMatch && jsonMatch.result && jsonMatch.result.fullBase64) {
  const base64Data = jsonMatch.result.fullBase64;
  const buffer = Buffer.from(base64Data, 'base64');
  const targetPath = path.join(__dirname, 'cv_frans_inspiration.png');
  fs.writeFileSync(targetPath, buffer);
  console.log('Saved CV-Frans inspiration image to:', targetPath);
} else {
  console.log('Could not extract fullBase64 from output text');
}
