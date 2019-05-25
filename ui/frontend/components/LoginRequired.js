import React from 'react'

const styleContainer = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3em',
  color: 'black',
}

class LoginRequired extends React.Component {
  render() {
    return (
      <div style={styleContainer}>
        This feature is only available to logged in users.
      </div>
    )
  }
}
export default LoginRequired
