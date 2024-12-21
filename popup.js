document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("history-list");
  
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
  