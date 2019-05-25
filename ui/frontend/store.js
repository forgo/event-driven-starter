import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import Immutable from 'seamless-immutable'
import history from './history'
import createRootReducer from './reducers/reducer'
import sagaMiddleware from './sagas/sagaMiddleware'

const getCompose = () => {
  if (
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
  return compose
}

const composeEnhancers = getCompose()

const store = createStore(
  createRootReducer(history), // new root reducer with router state
  Immutable(), // preloaded state
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      sagaMiddleware
    )
  )
)

export default store
