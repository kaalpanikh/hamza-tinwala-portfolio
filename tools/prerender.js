// Re-renders the quick index (work list + contact) into index.html so it shows
// without JavaScript and is readable by search engines.
// Run after ANY change to ROOMS, CONTACT or buildIndex():
//   npm i -D playwright && npx playwright install chromium   (first time only)
//   node tools/prerender.js
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const FILE = path.resolve(__dirname, '..', 'index.html');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.goto('file://' + FILE + '#work'); await p.waitForTimeout(400);
  const rooms = await p.$eval('#ix-rooms', el => el.innerHTML);
  const contact = await p.$eval('#ix-contact', el => el.innerHTML);
  let s = fs.readFileSync(FILE, 'utf8');
  s = s.replace(/<div id="ix-rooms">[\s\S]*?<\/div>\n    <div class="ix-foot">/, `<div id="ix-rooms">${rooms}</div>\n    <div class="ix-foot">`);
  s = s.replace(/<div class="ix-contact[^"]*" id="ix-contact">[\s\S]*?<\/div>\n    <div id="ix-rooms">/, `<div class="ix-contact ix-links" id="ix-contact">${contact}</div>\n    <div id="ix-rooms">`);
  fs.writeFileSync(FILE, s); await b.close(); console.log('prerendered index.html');
})();
