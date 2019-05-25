import React from 'react'

export const spacings = {
  normal: {
    header: {
      padding: '1em',
    },
    alert: {
      padding: '1em',
    },
    left: {
      width: '16em',
      padding: '1em',
    },
    main: {
      padding: '1em',
    },
    right: {
      width: '16em',
      padding: '1em',
    },
    footer: {
      padding: '1em',
    },
  },
  compact: {
    header: {
      padding: '0.618em',
    },
    alert: {
      padding: '0.618em',
    },
    left: {
      width: '10em',
      padding: '0.618em',
    },
    main: {
      padding: '0.618em',
    },
    right: {
      width: '10em',
      padding: '0.618em',
    },
    footer: {
      padding: '0.618em',
    },
  },
}

export const defaultSpacingContext = spacings.compact

export const SpacingContext = React.createContext(
  defaultSpacingContext // default
)
