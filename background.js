function sendNativeMessage(message) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendNativeMessage(
            "com.example.clipboard",
            message,
            (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve(response);
                }
            }
        );
    });
}

chrome.action.onClicked.addListener(async () => {
    try {
        const response = await sendNativeMessage({ action: "get_clipboard" });
        console.log("Clipboard content:", response.clipboard);
    } catch (error) {
        console.error("Failed to fetch clipboard content:", error);
    }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardHistory: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "addToClipboard") {
    chrome.storage.local.get("clipboardHistory", (data) => {
      const clipboardHistory = data.clipboardHistory || [];
      clipboardHistory.unshift(request.text);
      const uniqueHistory = [...new Set(clipboardHistory)].slice(0, 100); // Remove duplicates
      chrome.storage.local.set({ clipboardHistory: uniqueHistory });
    });
  } else if (request.type === "getClipboardHistory") {
    chrome.storage.local.get("clipboardHistory", (data) => {
      sendResponse(data.clipboardHistory || []);
    });
    return true; // Indicate asynchronous response
  }
});
