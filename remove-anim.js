const fs = require('fs');
let content = fs.readFileSync('public/DigitalMosaicFrame.svg', 'utf8');
content = content.replace(/ class="row-\d+"/g, '');
content = content.replace(/<style>[\s\S]*?<\/style>\n*/, '');
fs.writeFileSync('public/DigitalMosaicFrame.svg', content);
console.log('Animation removed');
