import React from "react";
import ReactDOM from "react-dom";

import "./styles/global.css";

import App from "./App";
import { Provider } from "./Context";
//The entry point into the application which renders the main <App> component.
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
