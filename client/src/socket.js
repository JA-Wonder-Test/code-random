import { receivePartner, addMessage } from "./Redux/Actions";
import Message from "./Model/Message";

let socket;

const getSocket = () => new WebSocket("ws://localhost:5000");

export default {
  // Handle initial connection to socket server
  connect: (userName, userId, dispatch) => {
    socket = getSocket();
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "CONNECT",
          userId,
          userName
        })
      );
    };
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        // Server sends this when a match is made with a partner
        case "PAIR":
          dispatch(receivePartner(data.pairUser));
          break;

        // Server sends this when a message is recieved
        case "SEND":
          dispatch(addMessage(new Message(data.name, data.id, data.text)));
          break;

        default:
          break;
      }
    };
  },

  // Send message to partner
  sendMessage: message => {
    // Only send if socket exists
    if (socket) {
      socket.send(
        JSON.stringify({
          type: "SEND",
          from: message.userId,
          text: message.text
        })
      );
    }
  },

  // Send a request for a new partner
  reconnect: userId => {
    socket.send(
      JSON.stringify({
        type: "RE-PAIR",
        from: userId
      })
    );
  }
};
