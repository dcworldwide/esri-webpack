/// <reference path="./typings/index.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/root'
import configureStore from './store/configureStore'
// import 'babel-polyfill'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <Root store={store} history={history} />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />, document.getElementById('root')
)

if (module.hot) {
  module.hot.accept();
  console.log("module.hot.accept() called")
}

