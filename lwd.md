# UI Layout & Workspace Design (LWD)

## 1. Goal
As the application scales into a mid-size desktop application with numerous automation tools, maintaining a single `index.html` and a monolithic `renderer.js` will become impossible. This document outlines the architectural plan for structuring the front-end (UI) using Vanilla JavaScript and CSS.

## 2. Directory Structure Plan

We will separate our front-end assets into a dedicated `src/ui/` directory:

```text
/electron
  ├── main.js                 (Main process bootstrapper)
  ├── package.json
  ├── lwd.md                  (This architecture document)
  ├── /src
      ├── /main               (Main process code: ipc.js, window management)
      ├── /automation         (Puppeteer logic: launcher.js, mapsExtractor.js)
      └── /ui                 (Renderer process code - THE FRONTEND)
           ├── index.html     (Minimal skeleton: contains root div)
           ├── renderer.js    (UI Entry point: Router and state manager)
           ├── /components    (Reusable UI elements)
           │    ├── Sidebar.js
           │    ├── ToolCard.js
           │    └── ToastNotification.js
           ├── /views         (Full page screens)
           │    ├── DashboardView.js
           │    └── SettingsView.js
           └── /styles        (Modular CSS files)
                ├── variables.css (Colors, fonts, spacing)
                ├── layout.css    (Grid/Flexbox rules for the shell)
                └── components/   (Component-specific CSS)
```

## 3. Component Architecture (Vanilla JS)
Since we are using Vanilla JavaScript, we will adopt a **Template Literal** rendering pattern. 
Instead of hardcoding hundreds of lines of HTML into `index.html`, we will dynamically generate the UI using JavaScript functions.

**Example `ToolCard.js`:**
```javascript
export function ToolCard({ id, title, description, icon, status }) {
    return `
        <div class="tool-card" id="card-${id}">
            <div class="tool-icon-wrapper">${icon}</div>
            <h3 class="tool-title">${title}</h3>
            <p class="tool-desc">${description}</p>
            <button id="btn-${id}" class="tool-action">Launch</button>
            <div id="status-${id}" class="status-msg ${status}"></div>
        </div>
    `;
}
```

## 4. State & Routing Management
- **Routing**: `renderer.js` will listen to sidebar clicks. When "Settings" is clicked, it will clear the `<main id="content">` element and inject the HTML returned by `SettingsView()`.
- **Tool Configuration**: We will maintain an array of objects representing the available tools (e.g., `toolsConfig.js`). The `DashboardView` will iterate over this array and generate `ToolCard`s dynamically. Adding a new tool will be as simple as adding a new object to the array.

## 5. CSS Strategy
- Move away from a single `styles.css`.
- Create a strict `variables.css` containing our dark mode palette, glassmorphism opacities, and typography tokens.
- Keep component styles localized to avoid specificity wars (e.g., `.tool-card` styles live only in `tool-card.css`).

## 6. Implementation Steps
1. Create the `src/ui/` directory structure.
2. Break `index.html` into `Sidebar.js` and `DashboardView.js`.
3. Create a `toolsConfig.js` to store the metadata for the "Google Maps Data Extractor" (and future tools).
4. Refactor `renderer.js` to dynamically mount these views on load.
5. Split `styles.css` into modular CSS files.
