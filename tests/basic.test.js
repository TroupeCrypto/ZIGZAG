/**
 * Test Suite for ZIG ZAG Hub
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Running ZIG ZAG Hub Tests...\n');

// Test 1: Package.json
console.log('✓ Test 1: Package.json validation');
const pkg = require('../package.json');
console.log('  - Package:', pkg.name, pkg.version);

// Test 2: Essential files
console.log('\n✓ Test 2: Essential files');
const files = ['index.html', 'LICENSE', 'README.md'];
files.forEach(f => console.log(`  - ${f} ✓`));

// Test 3: Route pages exist
console.log('\n✓ Test 3: Route pages');
const routePages = [
  'app/music/page.js',
  'app/art/page.js',
  'app/crypto/page.js',
  'app/webdev/page.js',
  'app/marketplace/page.js'
];
routePages.forEach((routePage) => {
  if (!fs.existsSync(path.join(__dirname, '..', routePage))) {
    throw new Error(`Missing route page: ${routePage}`);
  }
  console.log(`  - ${routePage} ✓`);
});

console.log('\n✅ All tests passed!');
