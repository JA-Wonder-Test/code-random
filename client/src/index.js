import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./Redux/Reducer";
import { setUserId } from "./Redux/Actions";
import uuid from "uuid/v1";
import App from "./Components/App";
import "./App.css";

// Initialize store with a random user ID
const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(setUserId(uuid()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
