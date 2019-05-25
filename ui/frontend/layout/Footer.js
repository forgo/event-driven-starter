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

class Footer extends React.Component {
  render() {
    const { colorContext, shadowContext, spacingContext } = this.props

    const { background, foreground } = colorContext.footer
    const { padding } = spacingContext.footer
    const { boxShadow } = shadowContext.footer

    // ARIA "contentinfo" Landmark
    // https://www.w3.org/TR/wai-aria-practices/examples/landmarks/contentinfo.html
    return (
      <footer
        role="contentInfo"
        style={style(background, foreground, padding, boxShadow)}
      >
        {this.props.children}
      </footer>
    )
  }
}

const FooterThemed = withTheme(Footer)
export default FooterThemed
