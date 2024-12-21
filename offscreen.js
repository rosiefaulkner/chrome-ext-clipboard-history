chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "readClipboard") {
      try {
        // Attempt to read the clipboard
        const clipboardContent = await parent.navigator.clipboard.readText();
        sendResponse({ clipboardContent });
      } catch (error) {
        console.error("Failed to read clipboard content:", error);
  
        // Handle lack of focus or other errors
        if (error.name === "NotAllowedError") {
          sendResponse({
            error: "Clipboard access denied. Ensure document is focused and retry.",
          });
        } else {
          sendResponse({ error: error.message });
        }
      }
    }
  
    return true; // Keep the message channel open for async responses
  });
  