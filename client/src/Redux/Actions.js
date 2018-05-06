import socket from "../socket";
import Message from "../Model/Message";
import MessageFilter from "../MessageFilter";

export const SET_USERID = "SET_USERID";
export const setUserId = id => ({
  id,
  type: "SET_USERID"
});

export const SET_USERNAME = "SET_USERNAME";
export const setUserName = name => ({
  name,
  type: "SET_USERNAME"
});

export const ADD_MESSAGE = "ADD_MESSAGE";
export const addMessage = message => ({
  message,
  type: "ADD_MESSAGE"
});

export const sendMessage = (name, id, text) => {
  return dispatch => {
    const message = new Message(name, id, text);
    if (MessageFilter.validateMessage(message, dispatch)) {
      dispatch(addMessage(message));
      socket.sendMessage(message);
    }
  };
};

export const UPDATE_MSGBOX_TEXT = "UPDATE_MSGBOX_TEXT";
export const updateMsgboxText = text => ({
  text,
  type: "UPDATE_MSGBOX_TEXT"
});

export const REMOVE_PARTNER = "REMOVE_PARTNER";
export const removePartner = () => ({
  type: "REMOVE_PARTNER"
});

export const DISCONNECT = "DISCONNECT";
export const disconnect = userId => {
  return dispatch => {
    dispatch(removePartner());
    socket.reconnect(userId);
  };
};

export const CONFIRM_USERNAME = "CONFIRM_USERNAME";
export const confirmUserName = () => ({
  type: "CONFIRM_USERNAME"
});

export const INIT_CONNECTION = "INIT_CONNECTION";
export const initConnection = (userName, userId) => dispatch => {
  dispatch(confirmUserName());
  socket.connect(userName, userId, dispatch);
};

export const RECEIVE_PARTNER = "RECEIVE_PARTNER";
export const receivePartner = name => ({
  name,
  type: "RECEIVE_PARTNER"
});
