// content.js - Reverted to standard message handling (non-streaming)
let popupContainer = null;
let inputElement = null;
let loadingElement = null;
let errorElement = null;
let lastActiveElement = null;

function createUI() {
    if (document.getElementById('omni-monaco-container')) return;

    popupContainer = document.createElement('div');
    popupContainer.id = 'omni-monaco-container';

    const header = document.createElement('div');
    header.id = 'omni-monaco-header';
    header.innerHTML = '<span id="omni-monaco-header-title">OmniMonaco</span><span>ESC para fechar</span>';

    const inputWrapper = document.createElement('div');
    inputWrapper.id = 'omni-monaco-input-wrapper';

    inputElement = document.createElement('input');
    inputElement.id = 'omni-monaco-input';
    inputElement.type = 'text';
    inputElement.placeholder = 'Instrua o OmniMonaco...';
    inputElement.autocomplete = 'off';

    inputWrapper.appendChild(inputElement);

    loadingElement = document.createElement('div');
    loadingElement.id = 'omni-monaco-loading';
    loadingElement.innerHTML = '<div class="omni-monaco-spinner"></div> Gerando código...';

    errorElement = document.createElement('div');
    errorElement.id = 'omni-monaco-error';

    const footer = document.createElement('div');
    footer.id = 'omni-monaco-footer';
    footer.textContent = 'Pressione Enter para enviar';

    popupContainer.appendChild(header);
    popupContainer.appendChild(inputWrapper);
    popupContainer.appendChild(loadingElement);
    popupContainer.appendChild(errorElement);
    popupContainer.appendChild(footer);

    document.body.appendChild(popupContainer);
    inputElement.addEventListener('keydown', handleInputKeydown);
    popupContainer.addEventListener('mousedown', (e) => e.stopPropagation());
}

function showPopup() {
    createUI();
    lastActiveElement = document.activeElement;
    popupContainer.classList.add('visible');
    inputElement.value = '';
    inputElement.focus();
    loadingElement.style.display = 'none';
    errorElement.style.display = 'none';
    inputElement.disabled = false;
}

function hidePopup() {
    if (popupContainer && popupContainer.classList.contains('visible')) {
        popupContainer.classList.remove('visible');
        if (lastActiveElement) lastActiveElement.focus();
    }
}

async function handleInputKeydown(e) {
    if (e.key === 'Escape') {
        hidePopup();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const prompt = inputElement.value.trim();
        if (!prompt) return;

        if (!chrome.runtime || !chrome.runtime.id) {
            showError("Extensão desconectada. Recarregue a página.");
            return;
        }

        inputElement.disabled = true;
        loadingElement.style.display = 'flex';
        errorElement.style.display = 'none';

        // Use standard sendMessage instead of connect/streaming
        chrome.runtime.sendMessage({ action: "generate_code", prompt: prompt }, (response) => {
            inputElement.disabled = false;
            loadingElement.style.display = 'none';

            if (chrome.runtime.lastError) {
                showError("Erro de comunicação: " + chrome.runtime.lastError.message);
                return;
            }

            if (response && response.success) {
                hidePopup();
                injectCode(response.code);
            } else {
                showError(response ? response.error : "Erro desconhecido na geração.");
                inputElement.focus();
            }
        });
    }
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function dedent(code) {
    const lines = code.split('\n');
    if (lines.length <= 1) return code.trimStart();

    // Find the minimum indentation of the first non-empty line
    const minIndent = lines
        .filter(line => line.trim().length > 0)
        .reduce((min, line) => {
            const match = line.match(/^(\s*)/);
            const indent = match[1].length;
            return indent < min ? indent : min;
        }, Infinity);

    if (minIndent === Infinity || minIndent === 0) return code.trimStart();

    return lines
        .map(line => line.length >= minIndent ? line.slice(minIndent) : line.trimStart())
        .join('\n')
        .trimStart();
}

function injectCode(code) {
    if (lastActiveElement) {
        lastActiveElement.focus();
    }

    // Fix for "staircase" indentation: 
    // We remove the common leading indentation from the block,
    // allowing the editor's auto-indent to work correctly.
    const cleanedCode = dedent(code);

    setTimeout(() => {
        document.execCommand('insertText', false, cleanedCode);
    }, 10);
}

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get({ enabled: true }, (items) => {
            if (items.enabled) {
                e.preventDefault();
                e.stopPropagation();
                showPopup();
            }
        });
    }
}, true);

window.addEventListener('mousedown', (e) => {
    if (popupContainer?.classList.contains('visible') && !popupContainer.contains(e.target)) {
        hidePopup();
    }
});
