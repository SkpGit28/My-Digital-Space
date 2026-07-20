const fs = require('fs');
let content = fs.readFileSync('public/DigitalMosaicFrame.svg', 'utf8');

// Clean up previous runs
content = content.replace(/\/ class="row-\d+"/g, '/');
content = content.replace(/ class="row-\d+"/g, '');
content = content.replace(/<style>[\s\S]*?<\/style>\n*/, '');

// The Y values roughly increase by 30.18.
// We can find the row by Math.floor((y || 0) / 30).
content = content.replace(/<rect([^>]+)>/g, (match, attrs) => {
    // Only animate the filled mosaic rectangles, not the stroke lines
    if (attrs.includes('stroke=')) {
        return match;
    }

    let y = 0;
    const yMatch = attrs.match(/y="([0-9.]+)"/);
    if (yMatch) {
        y = parseFloat(yMatch[1]);
    }
    const row = Math.floor(y / 30);
    
    // Handle self-closing tags properly
    if (attrs.trim().endsWith('/')) {
        const cleanAttrs = attrs.trim().slice(0, -1);
        return `<rect ${cleanAttrs} class="row-${row}"/>`;
    }
    
    return `<rect ${attrs} class="row-${row}">`;
});

const styleBlock = `
<style>
  @keyframes glow {
    0% { opacity: 0; }
    30% { opacity: 1; }
    100% { opacity: 0; }
  }
  rect[class^="row-"] {
    animation: glow 4s infinite ease-in-out;
    opacity: 0; /* default state */
  }
  ${Array.from({length: 15}).map((_, i) => `
    rect.row-${i} { animation-delay: ${i * 0.15}s; }
  `).join('\n')}
</style>
`;

content = content.replace(/<svg([^>]+)>/, `<svg$1>\n${styleBlock}`);
fs.writeFileSync('public/DigitalMosaicFrame.svg', content);
console.log('SVG processed successfully.');
