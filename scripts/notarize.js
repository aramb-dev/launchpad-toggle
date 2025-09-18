require('dotenv').config();
const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log('🍎 Starting notarization process...');

  return await notarize({
    tool: 'notarytool',
    teamId: 'U8N2H82PMJ',
    appBundleId: 'com.arambdev.launchpadtoggle',
    appPath: `${appOutDir}/${appName}.app`,
    appleApiKey: process.env.APPLE_API_KEY_ID,
    appleApiIssuer: process.env.APPLE_API_ISSUER,
    appleApiKeyId: process.env.APPLE_API_KEY_ID,
  }).then(() => {
    console.log('✅ Notarization completed successfully');
  }).catch((error) => {
    console.error('❌ Notarization failed:', error);
    throw error;
  });
};