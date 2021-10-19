//
//

const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 3000 });

let messageCount = 0;
let name = "";

wss.on("connection", (ws) => {
  console.log("New connection");

  ws.send("You've connected!")

  ws.on("message", (message) => {
    console.log("Count", messageCount);
    console.log("received: %s", message);

    if (messageCount === 0) {
      ws.send("Whats your name?");

    } else if (messageCount === 1) {
      name = message;
      ws.send(`How can I help you ${message}?`);

    } else if (message.includes("bye" || "goodbye")) {
      ws.send(`See ya ${name}`);
      
    } else {
      ws.send(`${message}`);
    }
    messageCount++;
  });

  ws.on("close", () => {
    console.log("Disconnected");
    messageCount = 0;
    name = "";
  });
});
