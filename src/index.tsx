/// <reference path="./typings/index.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500, cyan700, pinkA200, grey100, grey300, grey400, grey500, white, darkBlack, fullBlack} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/root'
import configureStore from './store/configureStore'
require("./index.css");
// import 'babel-polyfill'


const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
  tableHeader: {
    backgroundColor: grey300
  }
})

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
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

