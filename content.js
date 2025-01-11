console.log('hello from content.js');

chrome.storage.sync.get("enabled", (data) => {
  const enabled = data.enabled ?? false;

  if (enabled) {
    console.log("Hello from content.js. Waiting for the checkbox to load...");

    // Function to process the checkbox
    function handleCheckbox() {
      const followCompanyCheckbox = document.querySelector('#follow-company-checkbox');

      if (followCompanyCheckbox) {
        console.log("Checkbox found! Updating state...");

        // Uncheck the checkbox if it is checked
        if (followCompanyCheckbox.checked) {
          console.log("Checkbox is checked. Unchecking it.");
          followCompanyCheckbox.checked = false;
        } else {
          console.log("Checkbox is already unchecked.");
        }

        // Disconnect observer after finding the checkbox
        observer.disconnect();
      }
    }

    // Use MutationObserver to detect when the checkbox is added to the DOM
    const observer = new MutationObserver(() => {
      handleCheckbox();
    });


    console.log("Starting observer...");
    // Start observing changes in the body element
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Try handling the checkbox immediately in case it's already loaded
    handleCheckbox();
  } else {
    console.log("Checkbox override is disabled.");
  }
});
