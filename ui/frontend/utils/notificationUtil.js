import { put } from 'redux-saga/effects'
import HttpStatus from 'http-status-codes'
import {
  notificationShow,
  notificationHide,
} from '../actions/NotificationActions'
import { push } from 'connected-react-router'
import { ROUTE } from '../routing'
import store from '../store'
import { logout } from '../actions/AuthActions'

const FAILURE_MESSAGE_UNAVAILABLE = 'Service unavailable'
const statusesUnavailable = [
  HttpStatus.BAD_GATEWAY,
  HttpStatus.SERVICE_UNAVAILABLE,
  HttpStatus.GATEWAY_TIMEOUT,
]
const FAILURE_MESSAGE_INTERNAL_ERROR = "We're having technical difficulties"
const FAILURE_MESSAGE_BAD_CREDENTIALS = 'Bad credentials'
const FAILURE_MESSAGE_TOKEN_EXPIRED = 'Token expired, please login'
const FAILURE_MESSAGE_UNAUTHORIZED = 'Insufficient privileges'
const FAILURE_MESSAGE_FALLBACK = 'Something went wrong'

export function* notificationForError(error, message, expired) {
  const errorStatus = error.response.status

  if (statusesUnavailable.includes(errorStatus)) {
    yield put(notificationShow(FAILURE_MESSAGE_UNAVAILABLE, true))
  } else if (errorStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
    yield put(notificationShow(FAILURE_MESSAGE_INTERNAL_ERROR, true))
  } else if (errorStatus === HttpStatus.UNAUTHORIZED) {
    yield put(
      notificationShow(
        expired
          ? FAILURE_MESSAGE_TOKEN_EXPIRED
          : FAILURE_MESSAGE_BAD_CREDENTIALS,
        true
      )
    )
    // ensure the user is logged out
    store.dispatch(logout())
    // redirect to login if our credentials have expired for whatever reason
    yield put(push(ROUTE.login.path))
  } else if (errorStatus === HttpStatus.FORBIDDEN) {
    yield put(notificationShow(FAILURE_MESSAGE_UNAUTHORIZED, true))
  } else {
    yield put(
      notificationShow(message ? message : FAILURE_MESSAGE_FALLBACK, true)
    )
  }
}
