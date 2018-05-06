import React from "react";
import { connect } from "react-redux";

// TODO message should come from ownProps, not state
const mapStateToProps = (state, ownProps) => ({
  message: state.messages.filter(it => it.id === ownProps.id)[0],
  userName: state.userName
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ message, userName }) => (
    <div id={`message-${message.id}`}>
      <span className="message-time">{formatMessageTime(message.time)}</span>
      <span
        className={`message-user ${
          // Messages sent by user should be red, recieved messages should be blue
          userName === message.user ? "message-sent" : "message-received"
        }`}
      >
        {message.user}
      </span>
      <span className="message-text">{message.text}</span>
    </div>
  )
);

// Given a unix timestamp, return HH:MM
const formatMessageTime = timestamp => {
  const date = new Date(timestamp);
  const mins = date.getMinutes().toString();
  return `${date.getHours()}:${mins.length === 1 ? `0${mins}` : mins}`;
};
