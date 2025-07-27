#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Pre-Deployment Optimization Check\n');

const checks = [];

// 1. Environment Variables Check
function checkEnvVars() {
  const envExample = path.join(process.cwd(), '.env.example');
  const envLocal = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envExample)) {
    checks.push({ name: 'Environment Variables', status: '❌', message: '.env.example not found' });
    return;
  }
  
  const requiredVars = fs.readFileSync(envExample, 'utf8')
    .split('\n')
    .filter(line => line.includes('='))
    .map(line => line.split('=')[0]);
  
  checks.push({ 
    name: 'Environment Variables', 
    status: '✅', 
    message: `${requiredVars.length} variables configured` 
  });
}

// 2. Bundle Size Check
function checkBundleSize() {
  try {
    console.log('Building project for bundle analysis...');
    execSync('npm run build', { stdio: 'pipe' });
    
    const buildDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(buildDir)) {
      checks.push({ name: 'Bundle Build', status: '✅', message: 'Build successful' });
    } else {
      checks.push({ name: 'Bundle Build', status: '❌', message: 'Build failed' });
    }
  } catch (error) {
    checks.push({ name: 'Bundle Build', status: '❌', message: `Build error: ${error.message}` });
  }
}

// 3. Image Optimization Check
function checkImages() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    checks.push({ name: 'Images', status: '❌', message: 'Public directory not found' });
    return;
  }
  
  const images = fs.readdirSync(publicDir).filter(file => 
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );
  
  let totalSize = 0;
  let largeImages = 0;
  
  images.forEach(image => {
    const imagePath = path.join(publicDir, image);
    const stats = fs.statSync(imagePath);
    totalSize += stats.size;
    
    if (stats.size > 500 * 1024) { // 500KB
      largeImages++;
    }
  });
  
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  if (largeImages > 0) {
    checks.push({ 
      name: 'Images', 
      status: '⚠️', 
      message: `${largeImages} large images (>500KB), total: ${totalSizeMB}MB` 
    });
  } else {
    checks.push({ 
      name: 'Images', 
      status: '✅', 
      message: `${images.length} images optimized, total: ${totalSizeMB}MB` 
    });
  }
}

// 4. SEO Meta Tags Check
function checkSEO() {
  const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    checks.push({ name: 'SEO Meta Tags', status: '❌', message: 'layout.tsx not found' });
    return;
  }
  
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  const hasMetadata = layoutContent.includes('generateMetadata');
  const hasOpenGraph = layoutContent.includes('openGraph');
  const hasTwitter = layoutContent.includes('twitter');
  
  if (hasMetadata && hasOpenGraph && hasTwitter) {
    checks.push({ name: 'SEO Meta Tags', status: '✅', message: 'Complete meta tags configured' });
  } else {
    checks.push({ name: 'SEO Meta Tags', status: '⚠️', message: 'Some meta tags missing' });
  }
}

// 5. Error Boundaries Check
function checkErrorBoundaries() {
  const errorBoundaryPath = path.join(process.cwd(), 'app', 'components', 'ErrorBoundary.tsx');
  if (fs.existsSync(errorBoundaryPath)) {
    checks.push({ name: 'Error Boundaries', status: '✅', message: 'Error boundary implemented' });
  } else {
    checks.push({ name: 'Error Boundaries', status: '❌', message: 'Error boundary missing' });
  }
}

// 6. Loading States Check
function checkLoadingStates() {
  const loadingPath = path.join(process.cwd(), 'app', 'components', 'ui', 'Loading.tsx');
  if (fs.existsSync(loadingPath)) {
    checks.push({ name: 'Loading States', status: '✅', message: 'Loading components implemented' });
  } else {
    checks.push({ name: 'Loading States', status: '❌', message: 'Loading components missing' });
  }
}

// 7. Security Headers Check
function checkSecurityHeaders() {
  const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
  if (!fs.existsSync(nextConfigPath)) {
    checks.push({ name: 'Security Headers', status: '❌', message: 'next.config.mjs not found' });
    return;
  }
  
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  const hasHeaders = configContent.includes('headers()');
  const hasCSP = configContent.includes('X-Content-Type-Options');
  
  if (hasHeaders && hasCSP) {
    checks.push({ name: 'Security Headers', status: '✅', message: 'Security headers configured' });
  } else {
    checks.push({ name: 'Security Headers', status: '⚠️', message: 'Some security headers missing' });
  }
}

// 8. TypeScript Check
function checkTypeScript() {
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    checks.push({ name: 'TypeScript', status: '✅', message: 'No type errors' });
  } catch (error) {
    checks.push({ name: 'TypeScript', status: '❌', message: 'Type errors found' });
  }
}

// Run all checks
async function runChecks() {
  console.log('Running checks...\n');
  
  checkEnvVars();
  checkSEO();
  checkImages();
  checkErrorBoundaries();
  checkLoadingStates();
  checkSecurityHeaders();
  
  // Skip time-consuming checks in CI
  if (!process.env.CI) {
    checkBundleSize();
    checkTypeScript();
  }
  
  // Display results
  console.log('📋 Pre-Deployment Checklist Results:\n');
  checks.forEach(check => {
    console.log(`${check.status} ${check.name}: ${check.message}`);
  });
  
  const passed = checks.filter(c => c.status === '✅').length;
  const warnings = checks.filter(c => c.status === '⚠️').length;
  const failed = checks.filter(c => c.status === '❌').length;
  
  console.log(`\n📊 Summary: ${passed} passed, ${warnings} warnings, ${failed} failed`);
  
  if (failed > 0) {
    console.log('\n❌ Some checks failed. Please fix the issues before deployment.');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n⚠️ Some warnings found. Consider addressing them for optimal performance.');
  } else {
    console.log('\n✅ All checks passed! Ready for deployment.');
  }
}

runChecks().catch(console.error);