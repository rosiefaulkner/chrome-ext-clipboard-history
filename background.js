/**
 * Sends a message to the native application to retrieve clipboard content.
 * This function uses Chrome's Native Messaging API to communicate with a native app,
 * requesting clipboard data outside of the browser environment.
 * 
 * @param {Object} message - The message object to send to the native application.
 * @returns {Promise<Object>} A promise that resolves with the response from the native app.
 * @throws {string} If an error occurs during the communication, the promise is rejected with the error message.
 */
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

/**
* Listens for the user to click on the extension's action (icon) and triggers the fetching of clipboard content.
* When the action is triggered, it calls `sendNativeMessage` to retrieve the clipboard data from the native application,
* and logs the clipboard content to the console. Errors are caught and logged if the clipboard content can't be fetched.
*/
chrome.action.onClicked.addListener(async () => {
  try {
      const response = await sendNativeMessage({ action: "get_clipboard" });
      console.log("Clipboard content:", response.clipboard);
  } catch (error) {
      console.error("Failed to fetch clipboard content:", error);
  }
});

/**
* Initializes the extension by setting up an empty clipboard history when the extension is installed.
* This listener is triggered only once upon the installation of the extension.
*/
chrome.runtime.onInstalled.addListener(() => {
chrome.storage.local.set({ clipboardHistory: [] });
});

/**
* Handles messages related to clipboard history.
* 
* - When a message with type "addToClipboard" is received, the text is added to the clipboard history.
* - When a message with type "getClipboardHistory" is received, the current clipboard history is retrieved
*   and sent back as a response.
* 
* @param {Object} request - The request object containing the type of action and any necessary data.
* @param {Object} sender - The sender of the message.
* @param {Function} sendResponse - The callback function to send the response back to the sender.
* @returns {boolean} True if the response is sent asynchronously.
*/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
if (request.type === "addToClipboard") {
  chrome.storage.local.get("clipboardHistory", (data) => {
    const clipboardHistory = data.clipboardHistory || [];
    clipboardHistory.unshift(request.text); // Add new text at the start of the history
    const uniqueHistory = [...new Set(clipboardHistory)].slice(0, 100); // Remove duplicates and limit to 100 items
    chrome.storage.local.set({ clipboardHistory: uniqueHistory });
  });
} else if (request.type === "getClipboardHistory") {
  chrome.storage.local.get("clipboardHistory", (data) => {
    sendResponse(data.clipboardHistory || []); // Return the clipboard history, or an empty array if none exists
  });
  return true; // Indicates the response will be sent asynchronously
}
});
