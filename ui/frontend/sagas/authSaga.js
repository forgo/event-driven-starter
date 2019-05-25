import {
  WHO_AM_I,
  whoAmISuccess,
  whoAmIFailure,
  LOGIN,
  LOGOUT,
  loginSuccess,
  loginFailure,
} from '../actions/AuthActions'
import { popupConfirm } from '../actions/CounterActions'
import {
  notificationShow,
  notificationHide,
} from '../actions/NotificationActions'
import { push } from 'connected-react-router'
import HttpStatus from 'http-status-codes'
import { ROUTE } from '../routing'
import { notificationForError } from '../utils/notificationUtil'

import { call, delay, put, takeLatest } from 'redux-saga/effects'
import Api from '../api/Api'

function* whoAmISaga(action) {
  try {
    // repopulate redux user auth info from token cookie (if still valid)
    const user = yield call(Api.whoAmI)
    yield put(whoAmISuccess(user))
    // hide any notifications
    yield put(notificationHide())
  } catch (error) {
    // Don't notify for these errors because this action is performed on refresh

    // The failure action still exists to ensure we toggle a `loggingIn` state
    // to avoid any glitchy in-between refresh UI states
    yield put(whoAmIFailure())
  }
}

function* loginSaga(action) {
  try {
    yield put(notificationShow('Logging in...'))

    // artificial 200ms delay to show off UI handling of in-between states
    yield delay(500)

    const user = yield call(Api.login, action.username, action.password)
    yield put(loginSuccess(user))
    // hide any login errors if they had not been manually dismissed
    yield put(notificationHide())
    // reset count to "0" on logout
    yield put(popupConfirm('0'))
    // redirect to home route after successful login
    yield put(push(ROUTE.home.path))
  } catch (error) {
    yield put(loginFailure())
    yield notificationForError(error)
  }
}

function* logoutSaga(action) {
  try {
    const logoutResponse = yield call(Api.logout)
    // redirect to home route after successful logout
    yield put(push(ROUTE.login.path))
  } catch (error) {
    // redirect to home route after anomalous logout
    yield put(push(ROUTE.login.path))
  }
}

// saga watcher triggered when dispatching LOGIN action
export default function* authSaga() {
  yield* [
    takeLatest(WHO_AM_I, whoAmISaga),
    takeLatest(LOGIN, loginSaga),
    takeLatest(LOGOUT, logoutSaga),
  ]
}
