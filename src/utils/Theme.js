import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

const THEMES = {
  vibrantCyan: {
    colors: {
      primary: '#2DBECD',
      secondary: '#FFC832',
    },
  },
  richPurple: {
    colors: {
      primary: '#503291',
      secondary: '#2DBECD',
    },
  },
}

export const DEFAULT_THEME = THEMES.vibrantCyan

export const Theme = ({themeName, children}) =>
  <ThemeProvider theme={THEMES[themeName]} >
    {children}
  </ThemeProvider>

Theme.propTypes = {
  themeName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}
