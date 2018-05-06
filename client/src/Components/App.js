import React from "react";
import { connect } from "react-redux";
import MessageContainer from "./MessageContainer";
import MessageSender from "./MessageSender";
import UsernamePicker from "./UsernamePicker";
import PartnerWaitingRoom from "./PartnerWaitingRoom";

const mapStateToProps = (state, ownProps) => ({
  usernameSaved: state.usernameSaved,
  partner: state.partner
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ usernameSaved, partner }) =>
    // User should first see username picker until username is saved
    !usernameSaved ? (
      <div className="app">
        <UsernamePicker />
      </div>
    ) : // User should see waiting for partner screen until match is made
    !partner ? (
      <div className="app">
        <PartnerWaitingRoom />
      </div>
    ) : (
      // If there is a match, show chat screen
      <div className="app">
        <MessageContainer />
        <MessageSender />
      </div>
    )
);
