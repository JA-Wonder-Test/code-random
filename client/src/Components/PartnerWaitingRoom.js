import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(() => (
  <div id="partner-waiting-room">Finding a partner...</div>
));
