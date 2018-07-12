import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import { THEMES, DEFAULT_THEME } from '~/utils/consts/themes'

export const Base = styled.div`
  font-family: ${props => props.theme.fontFamily};
  line-height: 1.4;
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const Theme = ({ themeName, ...props }) => (
  <ThemeProvider theme={THEMES[themeName] || DEFAULT_THEME}>
    <Fragment>
      <link
        href='https://fonts.googleapis.com/css?family=Lato:400,900'
        rel='stylesheet'
      />
      <Base {...props} />
    </Fragment>
  </ThemeProvider>
)

Theme.propTypes = {
  themeName: PropTypes.oneOf(Object.keys(THEMES)),
  children: PropTypes.element.isRequired,
}

export default Theme
