export const WHO_AM_I = 'WHO_AM_I'
export const whoAmI = () => {
  return {
    type: WHO_AM_I,
  }
}

export const WHO_AM_I_SUCCESS = 'WHO_AM_I_SUCCESS'
export const whoAmISuccess = user => {
  return {
    type: WHO_AM_I_SUCCESS,
    user: user,
  }
}

export const WHO_AM_I_FAILURE = 'WHO_AM_I_FAILURE'
export const whoAmIFailure = () => {
  return {
    type: WHO_AM_I_FAILURE,
  }
}

export const LOGIN = 'LOGIN'
export const login = (username, password) => {
  return {
    type: LOGIN,
    username: username,
    password: password,
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  }
}

export const LOGOUT = 'LOGOUT'
export const logout = () => {
  return {
    type: LOGOUT,
  }
}
