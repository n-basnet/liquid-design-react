import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css, injectGlobal, ThemeProvider } from 'styled-components'

import { THEMES, DEFAULT_THEME_NAME, getCustomTheme } from '~/utils/consts/themes'
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
  body { 
    margin: 0; 
    padding: 0; 
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

const Theme = ({ themeName, customTheme, ...props }) => (
  <ThemeProvider theme={customTheme ? getCustomTheme(themeName, customTheme) : THEMES[themeName]}>
    <Fragment>
      <link href='https://fonts.googleapis.com/css?family=Lato:400,700,900' rel='stylesheet' />
      <Base {...props} />
    </Fragment>
  </ThemeProvider>
)

Theme.propTypes = {
  themeName: PropTypes.oneOf(Object.keys(THEMES)),
  customTheme: PropTypes.shape({
    colors: PropTypes.objectOf(
      PropTypes.shape({
        lightest: PropTypes.string,
        lighter: PropTypes.string,
        light: PropTypes.string,
        base: PropTypes.string,
        dark: PropTypes.string,
        darker: PropTypes.string,
        darkest: PropTypes.string,
      })
    ),
    zIndex: PropTypes.objectOf(PropTypes.number),
    fontSize: PropTypes.objectOf(PropTypes.string),
    fontWeight: PropTypes.objectOf(PropTypes.string),
    fontFamily: PropTypes.string,
    borderRadius: PropTypes.string,
    transition: PropTypes.string,
    boxShadow: PropTypes.string,
    doubleBoxShadowSmall: PropTypes.string,
    doubleBoxShadowSmallHover: PropTypes.string,
    doubleBoxShadow: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

Theme.defaultProps = {
  themeName: DEFAULT_THEME_NAME,
  customTheme: null,
}

export default Theme
