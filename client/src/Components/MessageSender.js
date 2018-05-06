import React from "react";
import { connect } from "react-redux";
import { updateMsgboxText, sendMessage } from "../Redux/Actions";

const mapStateToProps = (state, ownProps) => ({
  msgBoxText: state.msgBoxText,
  userName: state.userName,
  userId: state.userId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSendClick: (name, id, text) => dispatch(sendMessage(name, id, text)),
  onTextChange: text => dispatch(updateMsgboxText(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ msgBoxText, userName, userId, onSendClick, onTextChange }) => (
    <div id="message-sender">
      <textarea onChange={e => onTextChange(e.target.value)} />
      <a onClick={() => onSendClick(userName, userId, msgBoxText)}>Send</a>
    </div>
  )
);
