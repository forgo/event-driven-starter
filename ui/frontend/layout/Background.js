import React from 'react'
import { withTheme } from '../contexts/ThemeConsumer'

const pattern = require('../img/pattern.png')

const stylePattern = {
  background: `url(${pattern}) repeat`,
  // backgroundSize: '1.618em',
}

const styleGradient = {
  background:
    'linear-gradient(0deg, rgba(100, 100, 100, .1) 0%, rgba(225, 225, 225, .1) 100%)',
}

class Background extends React.Component {
  render() {
    return (
      <div style={stylePattern}>
        <div style={styleGradient}>{this.props.children}</div>
      </div>
    )
  }
}

const BackgroundThemed = withTheme(Background)
export default BackgroundThemed
