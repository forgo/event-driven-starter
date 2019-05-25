import React from 'react'

import {
  ColorContext,
  defaultColorContext,
  colors,
} from '../contexts/ColorContext'
import {
  ShadowContext,
  defaultShadowContext,
  shadows,
} from '../contexts/ShadowContext'
import {
  SpacingContext,
  defaultSpacingContext,
  spacings,
} from '../contexts/SpacingContext'

export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colorContext: defaultColorContext,
      shadowContext: defaultShadowContext,
      spacingContext: defaultSpacingContext,
    }
  }

  switchColorContext = key => {
    this.setState(state => ({
      colorContext: colors[key],
    }))
  }

  switchShadowContext = key => {
    this.setState(state => ({
      shadowContext: shadows[key],
    }))
  }

  switchSpacingContext = key => {
    this.setState(state => ({
      spacingContext: spacings[key],
    }))
  }

  render() {
    return (
      <ColorContext.Provider value={this.state.colorContext}>
        <ShadowContext.Provider value={this.state.shadowContext}>
          <SpacingContext.Provider value={this.state.spacingContext}>
            {this.props.children}
          </SpacingContext.Provider>
        </ShadowContext.Provider>
      </ColorContext.Provider>
    )
  }
}
