import {
  POPUP_SHOW,
  popupCancel,
  INCREMENT_COUNTER,
  incrementCounter,
  incrementCounterSuccess,
  incrementCounterFailure,
} from '../actions/CounterActions'
import { notificationShow } from '../actions/NotificationActions'
import { notificationForError } from '../utils/notificationUtil'

import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import Api from '../api/Api'

function* popupShowSaga(action) {
  try {
    // extract redux state in saga
    const state = yield select()
    const count = state.counter.count
    let nextCount = state.counter.nextCount

    // avoid unnecessary requests for nextCount on backend if POPUP_SHOW
    // action did this previously
    if (!nextCount) {
      const incrementReponse = yield call(Api.incrementCounter, action.count)
      nextCount = incrementReponse.data.count
    }

    yield put(incrementCounterSuccess(nextCount))
  } catch (error) {
    // hide the popup and persist existing count
    yield put(popupCancel())
    yield notificationForError(error, error.response.data.error, true)
  }
}

export default function* counterSaga() {
  yield takeLatest(POPUP_SHOW, popupShowSaga)
}
