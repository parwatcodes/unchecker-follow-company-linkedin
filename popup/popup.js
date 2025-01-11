document.addEventListener("DOMContentLoaded", () => {
  console.log("hello from popup.js");

  const checkboxElement = document.getElementById("toggleCheckbox");
  const label = document.getElementById("status");

  loadInitialState();

  checkboxElement.addEventListener("change", () => {
    const state = checkboxElement.checked;

    if (state) {
      label.textContent = "Enabled";
    } else {
      label.textContent = "Disabled";
    }

    saveState(state);
  });

  function loadInitialState() {
    chrome.storage.sync.get("enabled", (data) => {
      const enabled = data.enabled ?? false; // Fixed key name
      checkboxElement.checked = enabled;
      updateLabel(enabled);
    });
  }

  function saveState(enabled) {
    chrome.storage.sync.set({ enabled }, () => {
      console.log("State saved:", enabled);
      updateLabel(enabled);
    });
  }

  function updateLabel(enabled) {
    label.textContent = enabled ? "Enabled" : "Disabled";
  }
});
