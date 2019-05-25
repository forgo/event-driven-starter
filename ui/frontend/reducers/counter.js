import Immutable from 'seamless-immutable'
import {
  POPUP_SHOW,
  POPUP_CANCEL,
  POPUP_CONFIRM,
  INCREMENT_COUNTER,
  INCREMENT_COUNTER_SUCCESS,
  INCREMENT_COUNTER_FAILURE,
} from '../actions/CounterActions'

export const initialState = Immutable({
  // storing count as a string to utilize big-integer library on backend
  // and allow the number to be displayed accurately past integer overflow
  count: '0',
  nextCount: undefined,
  calculating: false,
  popup: false,
})

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      const requestState = state.set('calculating', true)
      return requestState
    case INCREMENT_COUNTER_SUCCESS:
      const responseSuccessState = state
        .set('calculating', false)
        .set('nextCount', action.nextCount)
      return responseSuccessState
    case INCREMENT_COUNTER_FAILURE:
      const responseFailureState = state
        .set('calculating', false)
        .set('nextCount', undefined)
      return responseFailureState
    case POPUP_SHOW:
      const popupShowState = state.set('popup', true)
      return popupShowState
    case POPUP_CANCEL:
      const popupCancelState = state.set('popup', false)
      return popupCancelState
    case POPUP_CONFIRM:
      const popupConfirmState = state
        .set('popup', false)
        .set('count', action.nextCount)
        .set('nextCount', undefined)
      return popupConfirmState
    default:
      return state
  }
}
