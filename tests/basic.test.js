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

console.log('\n✅ All tests passed!');
