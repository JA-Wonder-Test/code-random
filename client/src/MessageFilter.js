import { sendMessage, disconnect } from "./Redux/Actions";

export default {
  validateMessage: (message, dispatch) => {
    // Delay command - one argument (ms)
    // Send a message on a delay
    if (message.text.startsWith("/delay")) {
      // Split the message: /delay <Duration> <New message>
      const textWithoutFirstArg = message.text.substring(
        message.text.indexOf(" ")
      );
      const delay = parseInt(
        textWithoutFirstArg.substring(0, message.text.indexOf(" ")),
        10
      );
      const newMsg = textWithoutFirstArg.substring(message.text.indexOf(" "));

      // Ensure we have a proper delay as integer and a new message to send
      // Cancel the current message, send the shortened text
      if (delay && newMsg) {
        console.log(delay);
        setTimeout(
          () => dispatch(sendMessage(message.user, message.userId, newMsg)),
          delay
        );
      }

      // Fail silently for now, TODO send a system message once they're implemented
      return false;
    }

    // Hop command - no arguments
    // Disconnect and find a new partner
    if (message.text.startsWith("/hop")) {
      dispatch(disconnect(message.userId));

      return false;
    }

    return true;
  }
};
