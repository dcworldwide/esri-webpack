import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";

ReactDOM.render(<App/>, document.getElementById("app"))

if (module.hot) {
  module.hot.accept();
  console.log("module.hot.accept() called")
}
