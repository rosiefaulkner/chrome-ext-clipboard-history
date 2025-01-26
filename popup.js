document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("history-list");

  function renderHistory(items) {
      historyList.innerHTML = ''; // Clear existing list
      items.forEach(item => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          historyList.appendChild(listItem);
      });
  }

  chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "local" && changes.clipboardHistory) {
          renderHistory(changes.clipboardHistory.newValue);
      }
  });

  chrome.storage.local.get("clipboardHistory", (data) => {
      if (data.clipboardHistory) {
          renderHistory(data.clipboardHistory);
      }
  });
});