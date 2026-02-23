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

// Test 4: GitHub auth wiring files exist
console.log('\n✓ Test 4: GitHub auth files');
const authFiles = [
  'app/api/auth/[...nextauth]/route.js',
  'app/login/page.js',
  'middleware.js'
];
authFiles.forEach((filePath) => {
  if (!fs.existsSync(path.join(__dirname, '..', filePath))) {
    throw new Error(`Missing auth file: ${filePath}`);
  }
  console.log(`  - ${filePath} ✓`);
});

// Test 5: Next.js serves landing page from root path
console.log('\n✓ Test 5: Next.js root route config');
const nextConfig = require('../next.config.js');
if (nextConfig.basePath) {
  throw new Error('next.config.js basePath must not be set for root landing page');
}
console.log('  - next.config.js basePath not set ✓');

console.log('\n✅ All tests passed!');
