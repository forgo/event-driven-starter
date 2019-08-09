import React from 'react'
import { mergeButtonStyles } from '../style/buttonStyles';

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
    console.log('Button *click*')
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
    this.setState((state, props) => {
      return {
        ...state,
        focusing: true,
      }
    })
  }

  handleBlur = event => {
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
      title,
      text,
      type,
      ariaExpanded,
      ariaSelected,
      disabled,
      disabledText,
    } = this.props

    const styleMerged = mergeButtonStyles(
      this.state.hovering,
      this.state.pressing,
      this.state.focusing,
      disabled
    )

    return (
      <button
        id={id}
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
      >
        {disabled ? disabledText : text}
      </button>
    )
  }
}