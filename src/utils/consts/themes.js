import { rgba } from 'polished'

import COLORS from '~/utils/consts/colors'

const themeBase = {
  borderRadius: '6px',
  fontFamily: `'Lato', sans-serif`,
  fontSize: {
    xh1: '92px',
    xh2: '72px',
    xh3: '64px',
    xh4: '48px',
    xh5: '40px',
    xh6: '36px',
    h1: '32px',
    h2: '26px',
    h3: '22px',
    h4: '18px',
    h5: '16px',
    h6: '14px',
    bh1: '48px',
    bh2: '40px',
    bh3: '36px',
    bh4: '32px',
    bh5: '26px',
    bh6: '22px',
  },
  fontWeight: {
    regular: '400',
    black: '900',
  },
  transition: 'all 200ms',
  boxShadow: `0 10px 20px ${rgba(COLORS.BLACK, 0.1)}, 0 2px 4px ${rgba(
    COLORS.BLACK,
    0.05
  )}`,
  doubleBoxShadow: `0 30px 40px ${rgba(COLORS.BLACK, 0.2)}, 0 2px 4px ${rgba(
    COLORS.BLACK,
    0.05
  )}`,
  zIndex: {
    tooltips: 9,
  },
}

const themeBaseColors = {
  black: {
    base: COLORS.BLACK,
  },
  white: {
    base: COLORS.WHITE,
  },
  grey: {
    base: COLORS.GREY,
    aux: COLORS.AUX_GREY,
  },
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
    base: COLORS.DARK_GREY,
    darkest: COLORS.SENSITIVE_GREY_DARKEST,
  },
  richBlack: {
    base: COLORS.RICH_BLACK,
  },
}

const getTheme = ({ primary, secondary }) => ({
  colors: {
    primary: {
      base: COLORS[primary],
      dark: COLORS[`${primary}_DARK`],
      darker: COLORS[`${primary}_DARKER`],
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

export const DEFAULT_THEME_NAME = 'vibrantCyan'
export const DEFAULT_THEME = THEMES[DEFAULT_THEME_NAME]
