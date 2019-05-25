import React from 'react'
import ReactDOM from 'react-dom'
import Application from './Application'
import store from './store'
import history from './history'
import sagaMiddleware from './sagas/sagaMiddleware'
import sagas from './sagas/sagas'
import { whoAmI } from './actions/AuthActions'

import './style/fonts.css'
import './style/global.css'
import './style/media.css'

// prepare the app for rendering
const app = Application(store, history)

// run the sagas
sagaMiddleware.run(sagas)

// run initial checks (e.g. - re-evaluate auth reducer on refresh)
store.dispatch(whoAmI())

// create root DOM element for application
const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

// render the application
ReactDOM.render(app, rootElement)
