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
    bold: '700',
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
  richPurple: {
    lightest: COLORS.RICH_PURPLE_LIGHTEST,
    lighter: COLORS.RICH_PURPLE_LIGHTER,
    light: COLORS.RICH_PURPLE_LIGHT,
    base: COLORS.RICH_PURPLE,
    dark: COLORS.RICH_PURPLE_DARK,
    darker: COLORS.RICH_PURPLE_DARKER,
    darkest: COLORS.RICH_PURPLE_DARKEST,
  },
  vibrantMagenta: {
    lightest: COLORS.VIBRANT_MAGENTA_LIGHTEST,
    lighter: COLORS.VIBRANT_MAGENTA_LIGHTER,
    light: COLORS.VIBRANT_MAGENTA_LIGHT,
    base: COLORS.VIBRANT_MAGENTA,
    dark: COLORS.VIBRANT_MAGENTA_DARK,
    darker: COLORS.VIBRANT_MAGENTA_DARKER,
    darkest: COLORS.VIBRANT_MAGENTA_DARKEST,
  },
  richBlue: {
    lightest: COLORS.RICH_BLUE_LIGHTEST,
    lighter: COLORS.RICH_BLUE_LIGHTER,
    light: COLORS.RICH_BLUE_LIGHT,
    base: COLORS.RICH_BLUE,
    dark: COLORS.RICH_BLUE_DARK,
    darker: COLORS.RICH_BLUE_DARKER,
    darkest: COLORS.RICH_BLUE_DARKEST,
  },
  vibrantCyan: {
    lightest: COLORS.VIBRANT_CYAN_LIGHTEST,
    lighter: COLORS.VIBRANT_CYAN_LIGHTER,
    light: COLORS.VIBRANT_CYAN_LIGHT,
    base: COLORS.VIBRANT_CYAN,
    dark: COLORS.VIBRANT_CYAN_DARK,
    darker: COLORS.VIBRANT_CYAN_DARKER,
    darkest: COLORS.VIBRANT_CYAN_DARKEST,
  },
  vibrantYellow: {
    lightest: COLORS.VIBRANT_YELLOW_LIGHTEST,
    lighter: COLORS.VIBRANT_YELLOW_LIGHTER,
    light: COLORS.VIBRANT_YELLOW_LIGHT,
    base: COLORS.VIBRANT_YELLOW,
    dark: COLORS.VIBRANT_YELLOW_DARK,
    darker: COLORS.VIBRANT_YELLOW_DARKER,
    darkest: COLORS.VIBRANT_YELLOW_DARKEST,
  },
  vibrantGreen: {
    lightest: COLORS.VIBRANT_GREEN_LIGHTEST,
    lighter: COLORS.VIBRANT_GREEN_LIGHTER,
    light: COLORS.VIBRANT_GREEN_LIGHT,
    base: COLORS.VIBRANT_GREEN,
    dark: COLORS.VIBRANT_GREEN_DARK,
    darker: COLORS.VIBRANT_GREEN_DARKER,
    darkest: COLORS.VIBRANT_GREEN_DARKEST,
  },
  richRed: {
    lightest: COLORS.LIGHTEST,
    lighter: COLORS.LIGHTER,
    light: COLORS.RICH_RED_LIGHT,
    base: COLORS.RICH_RED,
    dark: COLORS.RICH_RED_DARK,
    darker: COLORS.RICH_RED_DARKER,
    darkest: COLORS.RICH_RED_DARKEST,
  },
  richBlack: {
    lightest: COLORS.RICH_BLACK_LIGHTEST,
    lighter: COLORS.RICH_BLACK_LIGHTER,
    light: COLORS.RICH_BLACK_LIGHT,
    base: COLORS.RICH_BLACK,
  },
  sensitiveGrey: {
    lightest: COLORS.SENSITIVE_GREY_LIGHTEST,
    lighter: COLORS.SENSITIVE_GREY_LIGHTER,
    light: COLORS.SENSITIVE_GREY_LIGHT,
    base: COLORS.SENSITIVE_GREY,
    dark: COLORS.SENSITIVE_GREY_DARK,
    darker: COLORS.SENSITIVE_GREY_DARKER,
    darkest: COLORS.SENSITIVE_GREY_DARKEST,
  },
  white: {
    base: COLORS.WHITE,
  },
  richGreen: {
    lightest: COLORS.RICH_GREEN_LIGHTEST,
    lighter: COLORS.RICH_GREEN_LIGHTER,
    light: COLORS.RICH_GREEN_LIGHT,
    base: COLORS.RICH_GREEN,
    dark: COLORS.RICH_GREEN_DARK,
    darker: COLORS.RICH_GREEN_DARKER,
    darkest: COLORS.RICH_GREEN_DARKEST,
  },
  black: {
    base: COLORS.BLACK,
  },
  grey: {
    base: COLORS.GREY,
    dark: COLORS.GREY_DARK,
    aux: COLORS.AUX_GREY,
  },
}

const getTheme = ({ primary, secondary }, props = {}) => ({
  colors: {
    primary: {
      lightest: COLORS[`${primary}_LIGHTEST`],
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
  ...props,
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
  richPurple: getTheme(
    {
      primary: 'RICH_PURPLE',
      secondary: 'VIBRANT_CYAN',
    },
    { hasWhiteText: true }
  ),
  vibrantMagenta: getTheme(
    {
      primary: 'VIBRANT_MAGENTA',
      secondary: 'RICH_PURPLE',
    },
    { hasWhiteText: true }
  ),
}

export const DEFAULT_THEME_NAME = 'vibrantCyan'
export const DEFAULT_THEME = THEMES[DEFAULT_THEME_NAME]
