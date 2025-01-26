/**
 * Reads a message from the standard input stream (stdin) and parses it as JSON.
 * Expects the first 4 bytes to indicate the message length, followed by the message content.
 * If no input is received or the message content is malformed, the function exits or throws an error.
 * 
 * @returns {Object} The parsed JSON object from the received message.
 * @throws {Error} If no content is received or the message is malformed.
 */
function readMessage() {
    const buffer = Buffer.alloc(4);
    const bytesRead = process.stdin.read(buffer);
    if (!bytesRead) {
        console.error("No input received.");
        process.exit(0);
    }

    const messageLength = buffer.readUInt32LE(0);
    console.log(`Message length: ${messageLength}`);

    const messageBuffer = Buffer.alloc(messageLength);
    const messageContent = process.stdin.read(messageBuffer);
    console.log(`Raw message content: ${messageBuffer.toString()}`);

    if (!messageContent) {
        throw new Error("No content received in the message.");
    }

    return JSON.parse(messageBuffer.toString());
}

/**
 * Sends a message to the standard output stream (stdout).
 * The message is serialized into a JSON string, and its length is prefixed before sending.
 * 
 * @param {Object} message - The message object to be sent.
 */
function sendMessage(message) {
    const response = JSON.stringify(message);
    const lengthBuffer = Buffer.alloc(4);
    lengthBuffer.writeUInt32LE(response.length, 0);
    process.stdout.write(lengthBuffer);
    process.stdout.write(response);
}

/**
 * Retrieves the current content from the system clipboard.
 * The method adapts to the platform and executes the appropriate command:
 *   - Windows: `powershell Get-Clipboard`
 *   - macOS: `pbpaste`
 *   - Linux: `xclip -o -selection clipboard`
 * 
 * @returns {string|null} The clipboard content or null if an error occurs.
 */
const { execSync } = require('child_process');

function getClipboard() {
    try {
        const command = process.platform === "win32" 
            ? "powershell -command \"Get-Clipboard\"" 
            : process.platform === "darwin"
            ? "pbpaste"
            : "xclip -o -selection clipboard";
        return execSync(command, { encoding: "utf-8" }).trim();
    } catch (err) {
        console.error("Failed to read clipboard:", err);
        return null;
    }
}

process.stdin.on('data', (inputBuffer) => {
  try {
      const message = JSON.parse(inputBuffer.toString());
      if (message.action === "get_clipboard") {
          const clipboardContent = getClipboard();
          sendMessage({ clipboard: clipboardContent || "Clipboard is empty" });
      } else {
          sendMessage({ error: "Unknown action" });
      }
  } catch (error) {
      console.error("Error processing input:", error);
      sendMessage({ error: "Error in processing the action" });
  }
});

/**
 * Event listener that listens for readable data from stdin, processes the incoming message, 
 * and sends an appropriate response based on the action requested. 
 * If the action is "get_clipboard", it retrieves the clipboard content and sends it back.
 * If the action is unknown, it sends an error message.
 */
process.stdin.on("readable", () => {
    const message = readMessage();
    if (message.action === "get_clipboard") {
        const clipboardContent = getClipboard();
        sendMessage({ clipboard: clipboardContent || "Clipboard is empty" });
    } else {
        sendMessage({ error: "Unknown action" });
    }
});
/**
 * Reads a message from the standard input stream (stdin) and parses it as JSON.
 * Expects the first 4 bytes to indicate the message length, followed by the message content.
 * If no input is received or the message content is malformed, the function exits or throws an error.
 * 
 * @returns {Object} The parsed JSON object from the received message.
 * @throws {Error} If no content is received or the message is malformed.
 */
function readMessage() {
    const buffer = Buffer.alloc(4);
    const bytesRead = process.stdin.read(buffer);
    if (!bytesRead) {
        console.error("No input received.");
        process.exit(0);
    }

    const messageLength = buffer.readUInt32LE(0);
    console.log(`Message length: ${messageLength}`);

    const messageBuffer = Buffer.alloc(messageLength);
    const messageContent = process.stdin.read(messageBuffer);
    console.log(`Raw message content: ${messageBuffer.toString()}`);

    if (!messageContent) {
        throw new Error("No content received in the message.");
    }

    return JSON.parse(messageBuffer.toString());
}

/**
 * Sends a message to the standard output stream (stdout).
 * The message is serialized into a JSON string, and its length is prefixed before sending.
 * 
 * @param {Object} message - The message object to be sent.
 */
function sendMessage(message) {
    const response = JSON.stringify(message);
    const lengthBuffer = Buffer.alloc(4);
    lengthBuffer.writeUInt32LE(response.length, 0);
    process.stdout.write(lengthBuffer);
    process.stdout.write(response);
}

/**
 * Retrieves the current content from the system clipboard.
 * The method adapts to the platform and executes the appropriate command:
 *   - Windows: `powershell Get-Clipboard`
 *   - macOS: `pbpaste`
 *   - Linux: `xclip -o -selection clipboard`
 * 
 * @returns {string|null} The clipboard content or null if an error occurs.
 */
function getClipboard() {
    try {
        // Platform-specific clipboard command
        const command = process.platform === "win32" 
            ? "powershell Get-Clipboard" 
            : process.platform === "darwin"
            ? "pbpaste"
            : "xclip -o -selection clipboard";
        return execSync(command, { encoding: "utf-8" }).trim();
    } catch (err) {
        return null;
    }
}

/**
 * Event listener that listens for readable data from stdin, processes the incoming message, 
 * and sends an appropriate response based on the action requested. 
 * If the action is "get_clipboard", it retrieves the clipboard content and sends it back.
 * If the action is unknown, it sends an error message.
 */
process.stdin.on("readable", () => {
    const message = readMessage();
    if (message.action === "get_clipboard") {
        const clipboardContent = getClipboard();
        sendMessage({ clipboard: clipboardContent || "Clipboard is empty" });
    } else {
        sendMessage({ error: "Unknown action" });
    }
});
