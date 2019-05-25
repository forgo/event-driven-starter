import React from 'react'

export const colors = {
  light: {
    header: {
      foreground: '#222222',
      background: '#F9F9F9',
    },
    alert: {
      info: {
        foreground: '#222222',
        background: 'LightBlue',
      },
      error: {
        foreground: '#222222',
        background: '#F08080',
      },
    },
    left: {
      foreground: 'green',
      background: '#EEE',
    },
    main: {
      foreground: '#222222',
      background: 'none',
    },
    right: {
      foreground: 'black',
      background: 'yellow',
    },
    footer: {
      foreground: '#222222',
      background: '#F9F9F9',
    },
  },
  dark: {
    background: '',
    header: {
      foreground: '#F9F9F9',
      background: '#222222',
    },
    alert: {
      info: {
        foreground: '#F9F9F9',
        background: 'DarkBlue',
      },
      error: {
        foreground: '#F9F9F9',
        background: '#8B0000',
      },
    },
    left: {
      foreground: 'white',
      background: 'black',
    },
    main: {
      foreground: '#F9F9F9',
      background: 'none',
    },
    right: {
      foreground: 'orange',
      background: 'brown',
    },
    footer: {
      foreground: '#F9F9F9',
      background: '#222222',
    },
  },
}

export const defaultColorContext = colors.dark

export const ColorContext = React.createContext(defaultColorContext)
