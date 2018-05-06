import React from "react";
import { connect } from "react-redux";
import Message from "./Message";

const mapStateToProps = (state, ownProps) => ({
  messages: state.messages
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(({ messages }) => (
  <div id="message-container">
    {messages.length > 0 ? (
      messages.map(it => <Message key={it.id} id={it.id} />)
    ) : (
      <div>No Messages</div>
    )}
  </div>
));
