import { rgba } from 'polished'

import COLORS from '~/utils/consts/colors'

const themeBase = {
  borderRadius: '6px',
  fontFamily: `'Lato', sans-serif`,
  transition: 'all 200ms',
  smallBoxShadow: `0 1px 2px 0 ${rgba(COLORS.BLACK, 0.1)};`,
  boxShadow: `0 10px 20px ${rgba(COLORS.BLACK, 0.1)}, 0 2px 4px ${rgba(
    COLORS.BLACK,
    0.05
  )}`,
  doubleBoxShadow: `0 30px 40px ${rgba(COLORS.BLACK, 0.2)}, 0 2px 4px ${rgba(
    COLORS.BLACK,
    0.05
  )}`,
  zIndex: {
    notifications: 10,
  },
}

const themeBaseColors = {
  black: COLORS.BLACK,
  white: COLORS.WHITE,
  grey: {
    base: COLORS.GREY,
    aux: COLORS.AUX_GREY,
  },
  darkGrey: COLORS.DARK_GREY,
  vibrantYellow: {
    base: COLORS.VIBRANT_YELLOW,
    dark: COLORS.VIBRANT_YELLOW_DARK,
  },
  richRed: {
    base: COLORS.RICH_RED,
    dark: COLORS.RICH_RED_DARK,
  },
  richBlue: {
    base: COLORS.RICH_BLUE,
    dark: COLORS.RICH_BLUE_DARK,
  },
  sensitiveGrey: {
    darkest: COLORS.SENSITIVE_GREY_DARKEST,
  },
  richBlack: COLORS.RICH_BLACK,
}

const getTheme = ({ primary, secondary }) => ({
  colors: {
    primary: {
      base: COLORS[primary],
      dark: COLORS[`${primary}_DARK`],
    },
    secondary: {
      base: COLORS[secondary],
      dark: COLORS[`${secondary}_DARK`],
    },
    ...themeBaseColors,
  },
  ...themeBase,
})

export const THEMES = {
  vibrantCyan: getTheme({
    primary: 'VIBRANT_CYAN',
    secondary: 'VIBRANT_YELLOW',
  }),
  richBlue: getTheme({
    primary: 'RICH_BLUE',
    secondary: 'VIBRANT_YELLOW',
  }),
  richPurple: getTheme({
    primary: 'RICH_PURPLE',
    secondary: 'VIBRANT_CYAN',
  }),
  vibrantMagenta: getTheme({
    primary: 'VIBRANT_MAGENTA',
    secondary: 'RICH_PURPLE',
  }),
}

export const DEFAULT_THEME = THEMES.vibrantCyan
