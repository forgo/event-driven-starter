import Immutable from 'seamless-immutable'
import {
  WHO_AM_I,
  WHO_AM_I_SUCCESS,
  WHO_AM_I_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/AuthActions'

export const initialState = Immutable({
  loggingIn: false,
  loggedIn: false,
  user: undefined,
})

export default function auth(state = initialState, action) {
  switch (action.type) {
    case WHO_AM_I:
      const waiState = state.set('loggingIn', true)
      return waiState
    case WHO_AM_I_SUCCESS:
      const waiSuccessState = state
        .set('loggingIn', false)
        .set('loggedIn', true)
        .set('user', action.user)
      return waiSuccessState
    case WHO_AM_I_FAILURE:
      const waiFailureState = state.set('loggingIn', false)
      return waiFailureState
    case LOGIN:
      const requestState = state.set('loggingIn', true)
      return requestState
    case LOGIN_SUCCESS:
      const responseSuccessState = state
        .set('loggingIn', false)
        .set('loggedIn', true)
        .set('user', action.user)
      return responseSuccessState
    case LOGIN_FAILURE:
      const responseFailureState = state.set('loggingIn', false)
      return responseFailureState
    case LOGOUT:
      const logoutState = state.set('user', undefined).set('loggedIn', false)
      return logoutState
    default:
      return state
  }
}
