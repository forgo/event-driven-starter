import React from 'react'

export const boxShadowNormal = '0.05em 0.05em 0.1em rgba(0,0,0,0.309)'
export const boxShadowSoft = '0px 0.1em 0.1em rgba(0,0,0,0.105)'
export const boxShadowSharp = '0em 0.05em 0.05em rgba(0,0,0,0.618)'

export const shadows = {
  normal: {
    header: {
      boxShadow: boxShadowNormal,
    },
    left: {
      boxShadow: boxShadowNormal,
    },
    main: {
      boxShadow: 'none',
    },
    right: {
      boxShadow: boxShadowNormal,
    },
    footer: {
      boxShadow: 'none',
    },
  },
  soft: {
    header: {
      boxShadow: boxShadowSoft,
    },
    left: {
      boxShadow: boxShadowSoft,
    },
    main: {
      boxShadow: 'none',
    },
    right: {
      boxShadow: boxShadowSoft,
    },
    footer: {
      boxShadow: 'none',
    },
  },
  sharp: {
    header: {
      boxShadow: boxShadowSharp,
    },
    left: {
      boxShadow: boxShadowSharp,
    },
    main: {
      boxShadow: 'none',
    },
    right: {
      boxShadow: boxShadowSharp,
    },
    footer: {
      boxShadow: 'none',
    },
  },
}

export const defaultShadowContext = shadows.normal

export const ShadowContext = React.createContext(
  defaultShadowContext // default
)
