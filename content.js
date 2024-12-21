document.addEventListener("copy", () => {
  navigator.clipboard
    .readText()
    .then((text) => {
      if (text) {
        chrome.runtime.sendMessage({ type: "addToClipboard", text });
      }
    })
    .catch((err) => {
      console.error("Failed to read clipboard content: ", err);
    });
});
