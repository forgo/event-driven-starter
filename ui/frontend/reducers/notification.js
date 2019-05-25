import Immutable from 'seamless-immutable'
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
} from '../actions/NotificationActions'

export const initialState = Immutable({
  message: undefined,
  isError: false,
})

export default function notification(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      const notificationShowState = state
        .set('message', action.message)
        .set('isError', action.isError)
      return notificationShowState
    case NOTIFICATION_HIDE:
      const notificationHideState = state
        .set('message', undefined)
        .set('isError', false)
      return notificationHideState
    default:
      return state
  }
}
