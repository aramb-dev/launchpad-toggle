#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

exports.default = async function(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);

  console.log('🧹 Cleaning app for code signing...');

  try {
    // Remove resource forks and extended attributes recursively
    execSync(`xattr -cr "${appPath}"`, { stdio: 'inherit' });
    console.log('✅ Successfully cleaned extended attributes');

    // Additional cleanup for specific problematic files
    const frameworksPath = path.join(appPath, 'Contents', 'Frameworks');
    execSync(`find "${frameworksPath}" -name "._*" -delete`, { stdio: 'inherit' });
    console.log('✅ Successfully removed dot-underscore files');

  } catch (error) {
    console.warn('⚠️ Warning during cleanup:', error.message);
    // Don't fail the build for cleanup warnings
  }
};