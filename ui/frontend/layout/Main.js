import React from 'react'
import { withTheme } from '../contexts/ThemeConsumer'

const style = (background, foreground, padding, boxShadow) => {
  return {
    background: background ? background : 'none',
    color: foreground ? foreground : 'initial',
    padding: padding ? padding : 'initial',
    boxShadow: boxShadow ? boxShadow : 'initial',
    display: 'flex',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxSizing: 'border-box',
    margin: '0 auto',
    width: '100%',
    outline: 'none',
  }
}

class Main extends React.Component {
  render() {
    const { colorContext, shadowContext, spacingContext } = this.props

    const { background, foreground } = colorContext.main
    const { padding } = spacingContext.main
    const { boxShadow } = shadowContext.main

    return (
      <main
        id="mainBlock"
        tabIndex="-1"
        style={style(background, foreground, padding, boxShadow)}
      >
        {this.props.children}
      </main>
    )
  }
}

const MainThemed = withTheme(Main)
export default MainThemed
