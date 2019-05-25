import React from 'react'

const styleContainer = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3em',
  color: 'black',
}

class NotFound extends React.Component {
  render() {
    return <div style={styleContainer}>404 Not Found</div>
  }
}
export default NotFound
