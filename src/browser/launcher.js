const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Apply stealth plugin globally
puppeteer.use(StealthPlugin());

/**
 * Launches a stealth Puppeteer browser instance using the local Chrome executable.
 * @param {Object} app - The Electron app instance (used to get paths)
 * @param {string} profileName - The name of the folder to save the persistent profile data
 * @returns {Promise<import('puppeteer-core').Browser>}
 */
async function launchBrowser(app, profileName) {
  // Dynamically import find-chrome-bin (ES module)
  const { findChrome } = await import('find-chrome-bin');
  
  const chromeInfo = await findChrome({});
  
  if (!chromeInfo || !chromeInfo.executablePath) {
    throw new Error("Could not find a local Chrome installation.");
  }

  // Create an isolated profile path for this specific tool session
  const userDataDir = path.join(app.getPath('userData'), profileName);

  const browser = await puppeteer.launch({
    executablePath: chromeInfo.executablePath,
    headless: false,
    userDataDir: userDataDir,
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  return browser;
}

module.exports = {
  launchBrowser
};
