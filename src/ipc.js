const { ipcMain } = require('electron');
const { openMapsExtractor } = require('./tools/mapsExtractor');

/**
 * Sets up all IPC communication channels for the application tools.
 * @param {Object} app - The Electron app instance
 */
function setupIpcHandlers(app) {
    // Handler for the Maps Extractor Tool
    ipcMain.on('launch-maps-extractor', async (event) => {
        try {
            await openMapsExtractor(app);
            event.reply('maps-extractor-launched');
        } catch (error) {
            console.error('Error launching maps extractor:', error);
            event.reply('maps-extractor-error', error.message);
        }
    });

    // NOTE: Future tool handlers can be cleanly added here.
    // e.g. ipcMain.on('launch-calendar-sync', ...)
}

module.exports = {
    setupIpcHandlers
};
