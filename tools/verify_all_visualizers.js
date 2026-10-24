// tools/verify_all_visualizers.js
// Loads all 100 visualizers in Node.js to verify zero syntax errors and valid module structure

const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'visualizers_catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

console.log(`Testing syntax and exports for ${catalog.length} visualizers...`);

let successCount = 0;
let failCount = 0;

catalog.forEach((item, index) => {
  const filePath = path.join(__dirname, '..', 'visualizers', `${item.id}.js`);
  try {
    const viz = require(filePath);
    if (!viz.id || !viz.title || typeof viz.init !== 'function' || typeof viz.render !== 'function') {
      console.error(`[FAIL] ${item.id}: missing required fields (id, title, init, render)`);
      failCount++;
    } else {
      successCount++;
    }
  } catch (err) {
    console.error(`[ERROR] ${item.id}: ${err.message}`);
    failCount++;
  }
});

console.log(`\n========================================`);
console.log(`Total: ${catalog.length}`);
console.log(`Passed: ${successCount}`);
console.log(`Failed: ${failCount}`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log(`All ${catalog.length} visualizers validated successfully!`);
}
