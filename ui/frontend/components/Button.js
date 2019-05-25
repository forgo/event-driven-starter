import React from 'react'
import Layout from '../layout/Layout'
import { fontFamilySansSerif } from '../utils/fontUtil'

const bgColor = 'green'
const bgColorDark = 'DarkGreen'
const bgColorDisabled = 'DarkGray'

const styleDefault = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  background: 'green',
  borderRadius: '0.618em',
  border: 'transparent',
  textAlign: 'center',
  fontSize: '1em',
  margin: 0,
  padding: '0.618em',
  fontFamily: fontFamilySansSerif(),
}

const styleHoverDefault = {
  filter: 'brightness(130.9%)',
}

const stylePressDefault = {
  boxShadow: 'none',
  filter: 'brightness(161.8%)',
}

const styleFocusDefault = {
  outline: '2px dashed white',
}

const styleDisableDefault = {
  background: `${bgColorDisabled}`,
}

export default class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovering: false,
      pressing: false,
      pressingGlobal: false,
      focusing: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleGlobalMouseUp, false)
    document.addEventListener('mousedown', this.handleGlobalMouseDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleGlobalMouseUp, false)
    document.removeEventListener('mousedown', this.handleGlobalMouseDown, false)
  }

  handleClick = event => {
    const { onClick } = this.props
    if (onClick) {
      onClick(event)
    }
  }

  handleMouseOver = event => {
    this.setState((state, props) => {
      return {
        ...state,
        hovering: true,
        pressing: state.pressingGlobal,
      }
    })
  }

  handleMouseOut = event => {
    this.setState((state, props) => {
      return {
        ...state,
        hovering: false,
        pressing: false,
      }
    })
  }

  handleGlobalMouseUp = event => {
    this.setState((state, props) => {
      return {
        ...state,
        pressingGlobal: false,
      }
    })
  }

  handleGlobalMouseDown = event => {
    this.setState((state, props) => {
      return {
        ...state,
        pressingGlobal: true,
      }
    })
  }

  handleMouseDown = event => {
    this.setState((state, props) => {
      return {
        ...state,
        pressing: true,
      }
    })
  }

  handleMouseUp = event => {
    this.setState((state, props) => {
      return {
        ...state,
        pressing: false,
      }
    })
  }

  handleFocus = event => {
    const { onFocus } = this.props
    if (onFocus) {
      onFocus(event)
    }
    this.setState((state, props) => {
      return {
        ...state,
        focusing: true,
      }
    })
  }

  handleBlur = event => {
    const { onBlur } = this.props
    if (onBlur) {
      onBlur(event)
    }
    this.setState((state, props) => {
      return {
        ...state,
        focusing: false,
      }
    })
  }

  render() {
    const {
      id,
      onClick,
      style,
      styleHover,
      stylePress,
      styleFocus,
      styleDisable,
      title,
      text,
      type,
      ariaExpanded,
      ariaSelected,
      disabled,
      disabledText,
    } = this.props

    const styleMerged = {
      ...styleDefault,
      ...style,
      ...(this.state.hovering ? { ...styleHoverDefault, ...styleHover } : {}),
      ...(this.state.pressing ? { ...stylePressDefault, ...stylePress } : {}),
      ...(this.state.focusing ? { ...styleFocusDefault, ...styleFocus } : {}),
      ...(disabled ? { ...styleDisableDefault, ...styleDisable } : {}),
    }

    return (
      <button
        style={styleMerged}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        title={title}
        type={type}
        aria-expanded={ariaExpanded}
        aria-selected={ariaSelected}
        aria-label={title || text}
        disabled={disabled}
        ref={button => {
          this.button = button
        }}
      >
        {disabled ? disabledText : text}
      </button>
    )
  }
}
