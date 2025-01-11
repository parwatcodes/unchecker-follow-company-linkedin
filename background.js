chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  console.log("hello from background.js");
  console.log("background js variables", tabId, changeInfo, tab);

  if (changeInfo.status === "complete" && tab.url.includes("linkedin.com")) {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ["content.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting content script:", chrome.runtime.lastError.message);
        } else {
          console.log("Content script injected successfully.");
        }
      }
    );
  }
});
