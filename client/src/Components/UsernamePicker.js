import React from "react";
import { connect } from "react-redux";
import { setUserName, initConnection } from "../Redux/Actions";

const mapStateToProps = (state, ownProps) => ({
  userName: state.userName,
  userId: state.userId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmitClick: (userName, userId) =>
    dispatch(initConnection(userName, userId)),
  onTextChange: text => dispatch(setUserName(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ userName, userId, onSubmitClick, onTextChange }) => (
    <div id="username-picker">
      <div>
        <label htmlFor="username">Enter a Username:</label>
      </div>
      <input name="username" onChange={e => onTextChange(e.target.value)} />
      <a onClick={() => onSubmitClick(userName, userId)}>Go</a>
    </div>
  )
);
