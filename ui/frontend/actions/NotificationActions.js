export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW'
export const notificationShow = (message, isError = false) => {
  return {
    type: NOTIFICATION_SHOW,
    message: message,
    isError: isError,
  }
}

export const NOTIFICATION_HIDE = 'NOTIFICATION_HIDE'
export const notificationHide = () => {
  return {
    type: NOTIFICATION_HIDE,
  }
}
