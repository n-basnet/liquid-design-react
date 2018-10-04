import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css, injectGlobal, ThemeProvider } from 'styled-components'

import { THEMES, DEFAULT_THEME_NAME } from '~/utils/consts/themes'
import { M_FONT_NAME } from '~/utils/consts'
import MWebFontWoff2 from '~/assets/fonts/MWeb-Regular.woff2'
import MWebFontWoff from '~/assets/fonts/MWeb-Regular.woff'

injectGlobal`
  @font-face {
    font-family: ${M_FONT_NAME};
    src: url(${MWebFontWoff2}) format('woff2'),
         url(${MWebFontWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

export const Base = styled.div`
  line-height: 1.4;
  font-size: 16px;
  ${props => css`
    color: ${props.theme.colors.richBlack.base};
    font-family: ${props.theme.fontFamily};
  `};
  button {
    font-family: ${props => props.theme.fontFamily};
  }
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -ms-overflow-style: none;
  }
`

const Theme = ({ themeName, ...props }) => (
  <ThemeProvider theme={THEMES[themeName]}>
    <Fragment>
      <link href='https://fonts.googleapis.com/css?family=Lato:400,700,900' rel='stylesheet' />
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
