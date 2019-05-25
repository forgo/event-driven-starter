import { combineReducers } from 'redux-seamless-immutable'
import { connectRouter } from 'connected-react-router'

export const RESET_STORE = 'reset_store'

import auth from './auth'
import counter from './counter'
import notification from './notification'

export default history => {
  return (state, action) => {
    // allow a top-level reducer action to trigger all reducers to initial state
    if (action.type === RESET_STORE) {
      state = undefined
    }

    const appReducer = combineReducers({
      router: connectRouter(history),
      auth,
      counter,
      notification,
    })
    return appReducer(state, action)
  }
}
