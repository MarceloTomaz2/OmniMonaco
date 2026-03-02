document.addEventListener('DOMContentLoaded', () => {
    const toggleInput = document.getElementById('toggleExtension');
    const statusLabel = document.getElementById('statusLabel');
    const openOptionsBtn = document.getElementById('openOptionsBtn');

    // Load current state
    chrome.storage.sync.get({ enabled: true }, (items) => {
        toggleInput.checked = items.enabled;
        updateLabel(items.enabled);
    });

    // Handle toggle
    toggleInput.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        updateLabel(isEnabled);
        chrome.storage.sync.set({ enabled: isEnabled });
    });

    // Open Options
    openOptionsBtn.addEventListener('click', () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    function updateLabel(isEnabled) {
        statusLabel.textContent = isEnabled ? 'Ativo' : 'Desativado';
        statusLabel.style.color = isEnabled ? 'var(--success)' : 'var(--text-muted)';
    }
});

