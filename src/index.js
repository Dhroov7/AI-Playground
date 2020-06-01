import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'

let tabId = 0;

// Reducer function for redux
const reducer = function (state = { tabs: [] }, action) {
  switch (action.type) {
    case "addTab":
      return {
        tabs: [
          ...state.tabs,
          {
            id: ++tabId,
            name: "newtab" + tabId + ".js",
            code: "/* This is an empty tab.*/",
          },
        ]
      };
    case "removeTab":
      return {
        tabs: state.tabs.filter((tab) => tab.id !== +action.payload.id)
      };
    case "changeTabName":
      return {
        tabs: state.tabs.map((tab) =>
          tab.id !== +action.payload.id
            ? tab
            : { ...tab, name: action.payload.name }
        )
      };
    case "changeTabCode":
      return {
        tabs: state.tabs.map((tab) =>
          tab.id !== +action.payload.id
            ? tab
            : { ...tab, code: action.payload.code }
        )
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  // For the redux devtools extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
