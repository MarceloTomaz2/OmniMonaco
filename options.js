// Restores select box and input fields state using the preferences stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { apiUrl: '', model: 'openai/gpt-4.1-mini', apiKey: '', temperature: '0.1' },
    (items) => {
      document.getElementById('apiUrl').value = items.apiUrl;
      document.getElementById('modelSelect').value = items.model;
      document.getElementById('apiKey').value = items.apiKey;
      document.getElementById('temperature').value = items.temperature;
    }
  );
};

// Saves options to chrome.storage
const saveOptions = () => {
  const apiUrl = document.getElementById('apiUrl').value;
  const model = document.getElementById('modelSelect').value;
  const apiKey = document.getElementById('apiKey').value;
  const temperature = document.getElementById('temperature').value;

  chrome.storage.sync.set(
    { apiUrl, model, apiKey, temperature },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Configurações salvas!';
      status.style.opacity = '1';
      setTimeout(() => {
        status.style.opacity = '0';
      }, 2000);
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);

