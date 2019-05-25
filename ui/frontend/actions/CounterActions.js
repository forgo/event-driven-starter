export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER,
  }
}

export const INCREMENT_COUNTER_SUCCESS = 'INCREMENT_COUNTER_SUCCESS'
export const incrementCounterSuccess = nextCount => {
  return {
    type: INCREMENT_COUNTER_SUCCESS,
    nextCount: nextCount,
  }
}

export const INCREMENT_COUNTER_FAILURE = 'INCREMENT_COUNTER_FAILURE'
export const incrementCounterFailure = () => {
  return {
    type: INCREMENT_COUNTER_FAILURE,
  }
}

export const POPUP_SHOW = 'POPUP_SHOW'
export const popupShow = count => {
  return {
    type: POPUP_SHOW,
    count: count,
  }
}

export const POPUP_CANCEL = 'POPUP_CANCEL'
export const popupCancel = () => {
  return {
    type: POPUP_CANCEL,
  }
}

export const POPUP_CONFIRM = 'POPUP_CONFIRM'
export const popupConfirm = nextCount => {
  return {
    type: POPUP_CONFIRM,
    nextCount: nextCount,
  }
}
