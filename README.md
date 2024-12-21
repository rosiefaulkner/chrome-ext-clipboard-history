# **Clipboard History Manager with Chrome Native Messaging**

Effortlessly track and access your clipboard history across applications using this innovative Chrome extension powered by **Native Messaging**. Designed for productivity enthusiasts, this project bridges the gap between browser-based extensions and system-wide clipboard access.

---

## **Features**
- **System-Wide Clipboard Access**  
  Fetch clipboard content seamlessly, whether copied from your browser, code editors, or other applications.
  
- **Native Messaging Integration**  
  Uses Chrome Native Messaging to securely communicate with a local Node.js application for real-time clipboard access.

- **Cross-Platform Support**  
  Compatible with Windows, macOS, and Linux, adapting to platform-specific clipboard tools like `pbpaste` or `xclip`.

- **Modern Web Technology**  
  Built using JavaScript with a focus on efficiency, simplicity, and extensibility.

---

## **How It Works**
1. **Clipboard Manager (Native App):**  
   A Node.js application that interacts with the system clipboard to fetch the latest content.

2. **Chrome Extension:**  
   Communicates with the native app using Chrome's Native Messaging API to fetch and display clipboard history.

3. **User-Friendly Integration:**  
   The clipboard content is logged directly to the browser console, with options for UI enhancements.

---

## **Setup & Installation**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/clipboard-history-manager.git
cd clipboard-history-manager
```
### **2. Install Dependencies**
Ensure you have Node.js installed, then run:

```bash
npm install
```

### **3. Set Up the Native Messaging Host**

1. Configure the Native Messaging Host manifest file:
2. Use `native_clipboard.js` as the path.
3. Place the manifest file in the appropriate directory for your operating system:

- Windows: %LOCALAPPDATA%\Google\Chrome\User Data\NativeMessagingHosts
- macOS/Linux: ~/.config/google-chrome/NativeMessagingHosts

4. Modify the manifest to include your Chrome extension ID.

### **4. Load the Chrome Extension**

Navigate to chrome://extensions in Chrome.
Enable Developer Mode.
Click Load unpacked and select the extension/ folder.

---

## Why This Matters

Tired of losing valuable snippets of copied text between applications? This tool saves time and boosts productivity by bridging the gap between browsers and the system clipboard. Ideal for developers, writers, and anyone who multitasks across apps!

## Contributing

Contributions are welcome! Feel free to fork the repository, submit issues, or open pull requests to enhance functionality.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, feel free to open an issue in the repository or reach out via GitHub discussions.







