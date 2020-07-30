import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, {
  css,
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components'

import {
  THEMES,
  DEFAULT_THEME_NAME,
  getCustomTheme,
} from '../utils/consts/themes'
import { M_FONT_NAME } from '../utils/consts'
import { disableWebkitTapHightlight } from '../utils/styling'
import { isTouchDevice } from '../utils/featureDetects'

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
    -ms-overflow-style: none;
    ${disableWebkitTapHightlight};
  }
`

class Theme extends PureComponent {
  state = {
    mWebRegularWoff: undefined,
    mWebRegularWoff2: undefined,
    error: undefined,
  }

  componentDidMount() {
    // fixes mobile Safari handling of pseudo classes on elements (https://stackoverflow.com/a/41217194)
    if (isTouchDevice()) {
      document.addEventListener('touchstart', function() {}, false)
    }

    const loadMWebRegularWoff = process.env.STORYBOOK_SB
      ? () => import('../assets/fonts/MWeb-Regular.woff')
      : () =>
          import(
            '@liquid-design/liquid-design-react/dist/assets/fonts/MWeb-Regular.woff'
          )
    const loadMWebRegularWoff2 = process.env.STORYBOOK_SB
      ? () => import('../assets/fonts/MWeb-Regular.woff2')
      : () =>
          import(
            '@liquid-design/liquid-design-react/dist/assets/fonts/MWeb-Regular.woff2'
          )

    Promise.all([loadMWebRegularWoff(), loadMWebRegularWoff2()])
      .then(results => {
        this.setState({
          mWebRegularWoff: results[0].default,
          mWebRegularWoff2: results[1].default,
        })
      })
      .catch(err => {
        this.setState({
          error: err,
        })
      })
  }

  render() {
    const { themeName, customTheme, ...props } = this.props

    const GlobalStyles = createGlobalStyle`
      @font-face {
        font-family: ${M_FONT_NAME};
        src: url(${this.state.mWebRegularWoff2}) format('woff2'),
             url(${this.state.mWebRegularWoff}) format('woff');
        font-weight: normal;
        font-style: normal;
      }
    `

    return (
      <ThemeProvider
        theme={
          customTheme
            ? getCustomTheme(themeName, customTheme)
            : THEMES[themeName]
        }
      >
        <>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700,900"
            rel="stylesheet"
          />
          <Base {...props} />
        </>
        <GlobalStyles />
      </ThemeProvider>
    )
  }
}

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
      }),
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
