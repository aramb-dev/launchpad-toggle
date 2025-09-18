#!/usr/bin/env node

// Clean up macOS metadata files that can interfere with code signing
const { execSync } = require('child_process');
const path = require('path');

console.log('🧹 Cleaning macOS metadata files...');

try {
  // Remove .DS_Store files
  execSync('find . -name ".DS_Store" -delete', { cwd: process.cwd() });

  // Remove AppleDouble files
  execSync('find . -name "._*" -delete', { cwd: process.cwd() });

  // Remove extended attributes that can cause signing issues
  execSync('xattr -cr .', { cwd: process.cwd() });

  console.log('✅ Cleanup completed successfully');
} catch (error) {
  console.warn('⚠️ Cleanup had some issues (this is usually fine):', error.message);
}