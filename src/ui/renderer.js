import { Sidebar } from './components/Sidebar.js';
import { DashboardView } from './views/DashboardView.js';

// In ES modules, 'require' isn't natively defined, but we can access it through the window 
// object since nodeIntegration is true.
const { ipcRenderer } = window.require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const sidebarRoot = document.getElementById('sidebar-root');
    const mainRoot = document.getElementById('main-root');

    // Mount Components
    sidebarRoot.innerHTML = Sidebar();
    mainRoot.innerHTML = DashboardView();

    // Setup global listeners
    setupToolListeners();
    setupNavigationListeners();
});

function setupToolListeners() {
    // We target the map extractor specifically based on the ID we gave it in toolsConfig.js
    const btnMaps = document.getElementById('btn-maps-extractor');
    const statusMaps = document.getElementById('status-maps-extractor');

    if (btnMaps) {
        btnMaps.addEventListener('click', () => {
            btnMaps.disabled = true;
            btnMaps.textContent = 'Launching...';
            statusMaps.classList.remove('active', 'error');
            
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
    }
}

function setupNavigationListeners() {
    // Example logic for switching between Dashboard and Settings in the future
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
            
            const view = link.getAttribute('data-view');
            // If view === 'settings', we would mount SettingsView() to mainRoot
        });
    });
}
