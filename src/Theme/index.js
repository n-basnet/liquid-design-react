import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css, ThemeProvider } from 'styled-components'

import { THEMES, DEFAULT_THEME_NAME } from '~/utils/consts/themes'

export const Base = styled.div`
  line-height: 1.4;
  ${props => css`
    color: ${props.theme.colors.richBlack.base};
    font-family: ${props.theme.fontFamily};
  `};
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const Theme = ({ themeName, ...props }) => (
  <ThemeProvider theme={THEMES[themeName]}>
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
  children: PropTypes.node.isRequired,
}

Theme.defaultProps = {
  themeName: DEFAULT_THEME_NAME,
}

export default Theme
