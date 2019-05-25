import React from 'react'
import { fontFamilyMonospace } from '../utils/fontUtil'

const styleInputContainerDefault = {
  background: 'white',
  color: 'black',
  height: '2.309em',
  marginRight: '0.309em',
  boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.5)',
  borderRadius: '0.309em',
  display: 'flex',
  position: 'relative',
  fontFamily: fontFamilyMonospace(),
}

const styleInputContainerFocusDefault = {
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
}

const styleInputDefault = {
  margin: '0.618em 0.309em 0.309em 0.309em',
  border: 'none',
  borderBottom: '2px solid transparent',
  background: 'none',
  boxSizing: 'border-box',
  minWidth: '17em',
  maxWidth: '30em',
  outline: 'none',
}

const styleInputFocusDefault = {
  borderBottom: '0.105em dotted #777',
}

const xBackgroundGradient = (bg, fg) => {
  return `
  linear-gradient(to bottom right,
    transparent 45%, ${fg} 47%, ${fg} 53%, transparent 55%
  ),
  linear-gradient(to bottom left ,
    transparent 45%, ${fg} 47%, ${fg} 53%, transparent 55%
  ),
  ${bg}
  `
}

const styleClearButtonDefault = {
  display: 'inline-block',
  alignSelf: 'center',
  background: xBackgroundGradient('white', 'black'),
  border: 'none',
  outline: 'none',
  borderRadius: '0.5em',
  width: '1em',
  height: '1.309em',
  marginRight: '0.618em',
}

const styleClearButtonHoverDefault = {
  background: xBackgroundGradient('black', 'white'),
}

const styleClearButtonFocusDefault = {
  background: xBackgroundGradient('black', 'white'),
}

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: props.value }
  }

  componentWillMount() {
    this.setState({
      value: this.props.value,
      focusingText: false,
      hoveringClear: false,
      focusingClear: false,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState((state, props) => {
      return {
        ...state,
        value: nextProps.value,
      }
    })
  }

  handleChange = event => {
    const { onChange } = this.props
    const newValue = event.target.value
    if (onChange) {
      onChange(newValue)
    }
    this.setState({ value: newValue })
  }

  handleKeyDown = event => {
    const { onEnterKeyDown, onTabKeyDown } = this.props
    const ENTER_KEY = 13
    const TAB_KEY = 9
    if (event.keyCode === ENTER_KEY) {
      event.preventDefault()
      if (onEnterKeyDown) {
        onEnterKeyDown(event.target.value)
      }
    } else if (event.keyCode === TAB_KEY && !event.shiftKey) {
      event.preventDefault()
      if (onTabKeyDown) {
        onTabKeyDown(event.target.value)
      }
    }
  }

  handleMouseOverClear = event => {
    this.setState((state, props) => {
      return {
        ...state,
        hoveringClear: true,
      }
    })
  }

  handleMouseOutClear = event => {
    this.setState((state, props) => {
      return {
        ...state,
        hoveringClear: false,
      }
    })
  }

  handleTextFocus = e => {
    this.setState((state, props) => {
      return {
        ...state,
        focusingText: true,
      }
    })
  }

  handleTextBlur = e => {
    this.setState((state, props) => {
      return {
        ...state,
        focusingText: false,
      }
    })
  }

  handleClear = event => {
    const { onClear } = this.props
    if (onClear) {
      onClear()
    }
    this.setState({ value: '' }, () => {
      this.input.focus()
    })
  }

  handleClearFocus = e => {
    this.setState((state, props) => {
      return {
        ...state,
        focusingClear: true,
      }
    })
  }

  handleClearBlur = e => {
    this.setState((state, props) => {
      return {
        ...state,
        focusingClear: false,
      }
    })
  }

  render() {
    const {
      id,
      type,
      name,
      placeholder,
      title,
      styleInputContainer,
      styleInputContainerFocus,
      styleInput,
      styleInputFocus,
      styleClearButton,
      styleClearButtonHover,
      styleClearButtonFocus,
      onClear,
    } = this.props

    const styleInputContainerMerged = {
      ...styleInputContainerDefault,
      ...styleInputContainer,
      ...(this.state.focusingText
        ? { ...styleInputContainerFocusDefault, ...styleInputContainerFocus }
        : {}),
    }

    const styleInputMerged = {
      ...styleInputDefault,
      ...styleInput,
      ...(this.state.focusingText
        ? { ...styleInputFocusDefault, ...styleInputFocus }
        : {}),
    }

    const styleClearButtonMerged = {
      ...styleClearButtonDefault,
      ...styleClearButton,
      ...(this.state.hoveringClear
        ? { ...styleClearButtonHoverDefault, ...styleClearButtonHover }
        : {}),
      ...(this.state.focusingClear
        ? { ...styleClearButtonFocusDefault, ...styleClearButtonFocus }
        : {}),
    }

    const styleSvgIcon = {
      outline: this.state.focusingClear ? '2px dashed #777' : 'none',
      fill: this.state.focusingClear ? '#2c71a2' : '#777',
    }

    return (
      <div style={styleInputContainerMerged}>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          title={title}
          style={styleInputMerged}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onFocus={this.handleTextFocus}
          onBlur={this.handleTextBlur}
          value={this.state.value || ''}
          ref={input => {
            this.input = input
          }}
        />
        <button
          type="button"
          style={styleClearButtonMerged}
          onClick={this.handleClear}
          onMouseOver={this.handleMouseOverClear}
          onMouseOut={this.handleMouseOutClear}
          onFocus={this.handleClearFocus}
          onBlur={this.handleClearBlur}
          aria-label={`clear ${title} text`}
        />
      </div>
    )
  }
}
export default Input
