import React from 'react'
import Input from './Input'
import Button from './Button'
import { boxShadowNormal } from '../contexts/ShadowContext'
import { fontFamilySansSerif } from '../utils/fontUtil'

const styleContainer = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#F9F9F9',
}

const styleForm = disabled => {
  return {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.618em',
    background: 'rgba(0, 0, 0, 0.2)',
    filter: disabled ? 'opacity(20%)' : 'none',
  }
}

const styleFieldset = {
  border: 'none',
}

const styleLabel = {
  display: 'block',
  margin: '0 0 0.309em 0',
  fontFamily: fontFamilySansSerif(),
}

const styleInputContainer = {
  margin: '0 0 1.618em 0',
}

const styleButton = {
  boxShadow: boxShadowNormal,
}

class Login extends React.Component {
  handleSubmit = event => {
    const { login } = this.props

    // prevent form submissions from
    // unwanted places like ENTER from clear button in inputs
    event.preventDefault()

    if (login) {
      const username = event.target.username.value
      const password = event.target.password.value
      login(username, password)
    }
  }

  handleEnterKeyDownUsername = value => {
    this.password.input.focus()
  }

  handleTabKeyDownUsername = value => {
    this.password.input.focus()
  }

  handleEnterKeyDownPassword = value => {
    this.submit.button.focus()
    this.submit.button.click()
  }

  handleTabKeyDownPassword = value => {
    this.submit.button.focus()
  }

  render() {
    const { loggedIn, loggingIn } = this.props

    const loginForm = (
      <form style={styleForm(loggingIn)} onSubmit={this.handleSubmit}>
        <fieldset style={styleFieldset} disabled={loggingIn}>
          <label htmlFor="username" style={styleLabel}>
            username
          </label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="enter username"
            onEnterKeyDown={this.handleEnterKeyDownUsername}
            onTabKeyDown={this.handleTabKeyDownUsername}
            ref={x => (this.username = x)}
            styleInputContainer={styleInputContainer}
          />
          <label htmlFor="password" style={styleLabel}>
            password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="enter password"
            onEnterKeyDown={this.handleEnterKeyDownPassword}
            onTabKeyDown={this.handleTabKeyDownPassword}
            ref={x => (this.password = x)}
            styleInputContainer={styleInputContainer}
          />
          <Button
            type="submit"
            style={styleButton}
            text="log in"
            title="log in with credentials"
            disabled={false}
            disabledText={'Authenticating...'}
            ref={x => (this.submit = x)}
          />
        </fieldset>
      </form>
    )

    return <div style={styleContainer}>{loginForm}</div>
  }
}
export default Login
