import React from 'react'
import Input from './Input'
import Button from './Button'
import InteractiveMeasure from './InteractiveMeasure'
import HookButton from './HookButton'

const styleContainer = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#F9F9F9',
}

class Login extends React.Component {
  render() {
    const loginForm = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div/>
        <Button
          type="button"
          text="Button"
          title="do old class stuff"
          disabled={false}
          disabledText={'Doing old class stuff...'}
        />
        <div/>
        <HookButton
          type="button"
          text="HookButton"
          title="do new hook stuff"
          disabled={false}
          disabledText={'Doing new hook stuff...'}
        />
        <div/>
        <InteractiveMeasure />
      </div>
    )

    return <div style={styleContainer}>{loginForm}</div>
  }
}
export default Login
