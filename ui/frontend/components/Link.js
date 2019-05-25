import React from 'react'
import { ROUTE } from '../routing'
import { fontFamilySansSerif } from '../utils/fontUtil'

const styleDefault = {
  color: 'DeepSkyBlue',
  fontFamily: fontFamilySansSerif(),
}

const styleHoverDefault = {
  textDecoration: 'underline',
}

export default class Link extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovering: false,
    }
  }

  handleMouseOver = event => {
    this.setState((state, props) => {
      return {
        ...state,
        hovering: true,
      }
    })
  }

  handleMouseOut = event => {
    this.setState((state, props) => {
      return {
        ...state,
        hovering: false,
      }
    })
  }

  render() {
    const { style, styleHover, children, onClick, path, push } = this.props

    const styleMerged = {
      ...styleDefault,
      ...style,
      ...(this.state.hovering ? { ...styleHoverDefault, ...styleHover } : {}),
    }

    let action = onClick
    if (path) {
      action = () => {
        push(path)
      }
    }

    return (
      <a
        style={styleMerged}
        onClick={action}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {children}
      </a>
    )
  }
}
