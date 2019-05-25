import axios from 'axios'
import { call, delay, put, takeLatest, wait } from 'redux-saga/effects'

function* whoAmI() {
  return yield axios.get('/api/whoAmI')
}

function* login(username, password) {
  return yield axios.post('/api/login', {
    username: username,
    password: password,
  })
}

function* logout() {
  return yield axios.post('/api/logout')
}

function* incrementCounter(count) {
  // insert artificial 2-second delay
  // yield delay(500)
  // return count === 0 ? 1 : count * 2

  const uri = `/api/increment?count=${count}`
  const uriEncoded = encodeURI(uri)
  return yield axios.get(uriEncoded)
}

export default {
  whoAmI: whoAmI,
  login: login,
  logout: logout,
  incrementCounter: incrementCounter,
}
