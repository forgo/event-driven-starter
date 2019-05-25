import React from 'react'
import { withTheme } from '../contexts/ThemeConsumer'

const style = (background, foreground, padding) => {
  return {
    background: background ? background : 'none',
    color: foreground ? foreground : 'initial',
    padding: padding ? padding : 'initial',
    flex: '0 0 auto',
    zIndex: 2,
  }
}

class Alert extends React.Component {
  render() {
    const { isError, colorContext, shadowContext, spacingContext } = this.props

    const { background, foreground } = isError
      ? colorContext.alert.error
      : colorContext.alert.info
    const { padding } = spacingContext.alert

    // ARIA "alert" role
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role
    return (
      <div role="alert" style={style(background, foreground, padding)}>
        {this.props.children}
      </div>
    )
  }
}

const AlertThemed = withTheme(Alert)
export default AlertThemed
