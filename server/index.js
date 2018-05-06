const data = require("./Data");
const responseGenerator = require("./ResponseGenerator");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

wss.on("connection", ws => {
  ws.on("message", message => {
    const json = JSON.parse(message);
    switch (json.type) {
      case "CONNECT":
        // On connect, try to pair users
        const pair = data.connect(json.userId, json.userName, ws);
        break;

      // Listen for messages
      case "SEND":
        const relevantPair = data.getPair(json.from);

        // If we can find the user's pair, send their partner a message from them
        if (relevantPair) {
          const recipient = data.getPairRecipient(relevantPair, json.from);
          const sender = data.getPairSender(relevantPair, json.from);
          recipient.socket.send(
            responseGenerator.createSendResponse(
              sender.id,
              sender.name,
              json.text
            )
          );
        }
        break;

      // Listen for hop requests
      case "RE-PAIR":
        const pairToRemove = data.getPair(json.from);

        // Add users to each other's block lists and put them both re-matching
        data.releasePair(pairToRemove);

        break;

      default:
        break;
    }
  });

  ws.on("close", () => {
    // TODO handle disconnects
  });
});
