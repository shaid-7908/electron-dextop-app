import { ToolCard } from '../components/ToolCard.js';
import { toolsConfig } from '../toolsConfig.js';

export function DashboardView() {
    const cardsHtml = toolsConfig.map(tool => ToolCard(tool)).join('');

    return `
        <div class="flex-1 p-10 overflow-y-auto">
            <header class="mb-10">
                <h1 class="text-3xl font-bold mb-2">Automations & Tools</h1>
                <p class="text-text-secondary">Manage and run your automated tasks from this workspace.</p>
            </header>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                ${cardsHtml}
            </div>
        </div>
    `;
}
