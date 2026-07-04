const { launchBrowser } = require('../browser/launcher');

/**
 * Handles the logic for the Google Maps Data Extractor tool
 * @param {Object} app - The Electron app instance
 */
async function openMapsExtractor(app) {
    const browser = await launchBrowser(app, 'maps-extractor-profile');
    
    const page = await browser.newPage();
    
    // Navigate to maps
    await page.goto('https://www.google.com/maps', { waitUntil: 'networkidle2' });
    
    browser.on('disconnected', () => {
        console.log('Maps Extractor Browser was closed by the user.');
    });
    
    return browser;
}

module.exports = {
    openMapsExtractor
};
