/**
 * Initializes the clipboard history feature when the DOM content is fully loaded.
 * It retrieves the clipboard history from the Chrome extension's background script,
 * renders it as a list of clickable items, and allows users to copy any item back to the clipboard.
 * 
 * The clipboard history is fetched by sending a message to the background script, and the response is
 * rendered in an unordered list with each item being clickable. Clicking an item writes the content
 * to the clipboard using the `navigator.clipboard.writeText` API.
 */
document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("history-list");
  
    /**
     * Renders the clipboard history in the UI by retrieving it from the background script.
     * Each history item is displayed as a list item. Clicking on a list item copies its content
     * to the clipboard.
     */
    function renderHistory() {
      chrome.runtime.sendMessage({ type: "getClipboardHistory" }, (response) => {
        if (!response || !Array.isArray(response)) {
          console.error("Failed to fetch clipboard history or history is empty.");
          return;
        }
        historyList.innerHTML = "";
        response.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          listItem.addEventListener("click", () => {
            navigator.clipboard.writeText(item);
          });
          historyList.appendChild(listItem);
        });
      });
    }
  
    renderHistory();
  });
  