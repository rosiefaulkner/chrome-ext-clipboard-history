const { execSync } = require("child_process");

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


function sendMessage(message) {
    const response = JSON.stringify(message);
    const lengthBuffer = Buffer.alloc(4);
    lengthBuffer.writeUInt32LE(response.length, 0);
    process.stdout.write(lengthBuffer);
    process.stdout.write(response);
}

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

process.stdin.on("readable", () => {
    const message = readMessage();
    if (message.action === "get_clipboard") {
        const clipboardContent = getClipboard();
        sendMessage({ clipboard: clipboardContent || "Clipboard is empty" });
    } else {
        sendMessage({ error: "Unknown action" });
    }
});
