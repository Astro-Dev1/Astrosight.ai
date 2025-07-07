#!/usr/bin/env node

// Build verification script
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build dependencies...');

const requiredFiles = [
  'utils/prisma.js',
  'utils/facebook-events.js',
  'prisma/schema.prisma',
  '.env.local.example'
];

const requiredPackages = [
  '@prisma/client',
  'prisma'
];

// Check required files
console.log('\n📁 Checking required files:');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

// Check package.json for required packages
console.log('\n📦 Checking required packages:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

requiredPackages.forEach(pkg => {
  if (allDeps[pkg]) {
    console.log(`✅ ${pkg} - v${allDeps[pkg]}`);
  } else {
    console.log(`❌ ${pkg} - Missing`);
  }
});

// Check for potential issues
console.log('\n🔧 Checking for potential build issues:');

// Check if .env.local exists (should not be committed)
if (fs.existsSync('.env.local')) {
  console.log('⚠️  .env.local exists - Make sure it\'s in .gitignore');
} else {
  console.log('✅ .env.local not found (good for Git security)');
}

// Check .gitignore
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  if (gitignore.includes('.env.local') || gitignore.includes('.env*')) {
    console.log('✅ .env files are properly ignored in .gitignore');
  } else {
    console.log('⚠️  .env files should be added to .gitignore');
  }
} else {
  console.log('❌ .gitignore not found');
}

console.log('\n🚀 Build verification complete!');
console.log('\nNext steps:');
console.log('1. Copy .env.local.example to .env.local');
console.log('2. Fill in your actual environment variables');
console.log('3. Run: npm install');
console.log('4. Run: npx prisma generate');
console.log('5. Run: npm run build');
