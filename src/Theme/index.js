import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { THEMES } from '~/utils/consts/themes'

export const Theme = ({themeName, children}) =>
  <ThemeProvider theme={THEMES[themeName]} >
    {children}
  </ThemeProvider>

Theme.propTypes = {
  themeName: PropTypes.oneOf(Object.keys(THEMES)).isRequired,
  children: PropTypes.element.isRequired,
}
