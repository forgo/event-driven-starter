import React from 'react'

import { ColorContext } from '../contexts/ColorContext'
import { ShadowContext } from '../contexts/ShadowContext'
import { SpacingContext } from '../contexts/SpacingContext'

export function withTheme(Component) {
  return class extends React.Component {
    render() {
      return (
        <ColorContext.Consumer>
          {colorContext => (
            <ShadowContext.Consumer>
              {shadowContext => (
                <SpacingContext.Consumer>
                  {spacingContext => (
                    <Component
                      {...this.props}
                      colorContext={colorContext}
                      shadowContext={shadowContext}
                      spacingContext={spacingContext}
                    />
                  )}
                </SpacingContext.Consumer>
              )}
            </ShadowContext.Consumer>
          )}
        </ColorContext.Consumer>
      )
    }
  }
}
