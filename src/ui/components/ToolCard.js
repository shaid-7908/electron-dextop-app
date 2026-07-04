export function ToolCard({ id, title, description, icon, disabled, actionText = 'Launch' }) {
    const opacityClass = disabled ? 'opacity-60' : '';
    const iconColorClass = disabled ? 'text-text-secondary' : 'text-accent';
    const buttonStateClass = disabled 
        ? 'bg-text-secondary cursor-not-allowed opacity-70' 
        : 'bg-accent hover:bg-accent-hover cursor-pointer';
    
    return `
        <div class="bg-card-bg border border-border-color rounded-2xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] ${opacityClass}" id="card-${id}">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center ${iconColorClass}">
                ${icon}
            </div>
            <h3 class="text-xl font-semibold">${title}</h3>
            <p class="text-text-secondary text-sm leading-relaxed flex-grow">${description}</p>
            <button id="btn-${id}" class="text-white border-none py-2.5 px-4 rounded-lg font-medium transition-colors w-full ${buttonStateClass}" data-tool-id="${id}" ${disabled ? 'disabled' : ''}>
                ${disabled ? 'Coming Soon' : actionText}
            </button>
            <div id="status-${id}" class="mt-3 text-sm hidden [&.active]:block [&.error]:text-red-500 text-emerald-500"></div>
        </div>
    `;
}
