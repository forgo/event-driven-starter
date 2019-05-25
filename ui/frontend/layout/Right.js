import React from 'react'
import { withTheme } from '../contexts/ThemeConsumer'

const style = (background, foreground, width, padding, boxShadow) => {
  return {
    color: foreground,
    background: background,
    width: width,
    padding: padding,
    boxShadow: boxShadow,
    minWidth: '3.236em',
    position: 'relative',
    overflow: 'hidden',
    transition: 'flex 0.2s linear',
    flex: '0 0 ' + width,
  }
}

class Right extends React.Component {
  render() {
    const { colorContext, shadowContext, spacingContext } = this.props

    const { background, foreground } = colorContext.right
    const { width, padding } = spacingContext.right
    const { boxShadow } = shadowContext.right

    return (
      <div style={style(background, foreground, width, padding, boxShadow)}>
        {this.props.children}
      </div>
    )
  }
}

const RightThemed = withTheme(Right)
export default RightThemed
