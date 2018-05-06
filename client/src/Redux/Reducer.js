import {
  SET_USERID,
  SET_USERNAME,
  ADD_MESSAGE,
  UPDATE_MSGBOX_TEXT,
  REMOVE_PARTNER,
  CONFIRM_USERNAME,
  RECEIVE_PARTNER
} from "./Actions";

const initState = {
  userId: null,
  userName: null,
  messages: [],
  msgBoxText: "",
  usernameSaved: false,
  partner: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USERID:
      return Object.assign({}, state, {
        userId: action.id
      });

    case SET_USERNAME:
      return Object.assign({}, state, {
        userName: action.name
      });

    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.message]
      });

    case UPDATE_MSGBOX_TEXT:
      return Object.assign({}, state, {
        msgBoxText: action.text
      });

    case CONFIRM_USERNAME:
      return Object.assign({}, state, {
        usernameSaved: true
      });

    case RECEIVE_PARTNER:
      return Object.assign({}, state, {
        partner: action.name
      });

    case REMOVE_PARTNER:
      return Object.assign({}, state, {
        partner: null,
        messages: []
      });

    default:
      return state;
  }
};
