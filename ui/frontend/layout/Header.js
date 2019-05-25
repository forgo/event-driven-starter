import React from 'react'
import { withTheme } from '../contexts/ThemeConsumer'

const style = (background, foreground, padding, boxShadow) => {
  return {
    background: background ? background : 'none',
    color: foreground ? foreground : 'initial',
    padding: padding ? padding : 'initial',
    boxShadow: boxShadow ? boxShadow : 'initial',
    flex: '0 0 auto',
    zIndex: 2,
  }
}

class Header extends React.Component {
  render() {
    const { colorContext, shadowContext, spacingContext } = this.props

    const { background, foreground } = colorContext.header
    const { padding } = spacingContext.header
    const { boxShadow } = shadowContext.header

    // ARIA "banner" Landmark
    // https://www.w3.org/TR/wai-aria-practices/examples/landmarks/banner.html
    return (
      <header
        role="banner"
        style={style(background, foreground, padding, boxShadow)}
      >
        {this.props.children}
      </header>
    )
  }
}

const HeaderThemed = withTheme(Header)
export default HeaderThemed
