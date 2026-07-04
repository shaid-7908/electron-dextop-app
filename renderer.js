const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const btnMaps = document.getElementById('btn-maps');
    const statusMaps = document.getElementById('status-maps');

    btnMaps.addEventListener('click', () => {
        btnMaps.disabled = true;
        btnMaps.textContent = 'Launching...';
        
        statusMaps.classList.remove('active', 'error');
        
        // Send IPC message to launch puppeteer
        ipcRenderer.send('launch-maps-extractor');
    });

    ipcRenderer.on('maps-extractor-launched', () => {
        btnMaps.disabled = false;
        btnMaps.textContent = 'Launch Extractor';
        
        statusMaps.textContent = 'Google Maps opened successfully!';
        statusMaps.className = 'status-msg active';
        
        setTimeout(() => {
            statusMaps.classList.remove('active');
        }, 5000);
    });

    ipcRenderer.on('maps-extractor-error', (event, errorMessage) => {
        btnMaps.disabled = false;
        btnMaps.textContent = 'Launch Extractor';
        
        statusMaps.textContent = `Error: ${errorMessage}`;
        statusMaps.className = 'status-msg error active';
    });
});
