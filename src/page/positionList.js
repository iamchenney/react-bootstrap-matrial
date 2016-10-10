import React,{Component} from 'react'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MyAwesomeReactComponent from '../components/MyAwesomeReactComponent'
import injectTapEventPlugin from 'react-tap-event-plugin'

import '../assert/css/bootstrap.css'
import '../assert/css/bootstrap-theme.css'

injectTapEventPlugin()

const App = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);

render(
  <App />,
  document.getElementById('app')
)
