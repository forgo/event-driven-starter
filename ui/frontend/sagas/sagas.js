import { all } from 'redux-saga/effects'
import authSaga from './authSaga'
import counterSaga from './counterSaga'

export default function* sagas() {
  yield all([authSaga(), counterSaga()])
}
