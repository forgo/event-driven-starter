import React from 'react'
import Button from './Button'
import { fontFamilyMonospace } from '../utils/fontUtil'

const styleContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: fontFamilyMonospace(),
}

const styleButton = {
  background: 'none',
}

const styleButtonHover = {
  background: 'none',
  textDecoration: 'underline',
}

class Notification extends React.Component {
  render() {
    const { message, notificationHide } = this.props

    if (message) {
      return (
        <div style={styleContainer}>
          <div>{message}</div>
          <Button
            style={styleButton}
            styleHover={styleButtonHover}
            text={String.fromCharCode(215)}
            title="dismiss error"
            onClick={notificationHide}
          />
        </div>
      )
    }
    return null
  }
}
export default Notification
