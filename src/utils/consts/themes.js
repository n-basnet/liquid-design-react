import { rgba, darken } from 'polished'

import COLORS from '~/utils/consts/colors'

const themeBase = {
  borderRadius: '6px',
  fontFamily: `'Lato', sans-serif`,
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
    notifications: 10,
  },
}

const themeBaseColors = {
  black: COLORS.BLACK,
  white: COLORS.WHITE,
  grey: COLORS.GREY,
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

export const THEMES = {
  vibrantCyan: {
    colors: {
      primary: {
        base: COLORS.VIBRANT_CYAN,
        dark: COLORS.VIBRANT_CYAN_DARK,
      },
      secondary: {
        base: COLORS.VIBRANT_YELLOW,
        dark: COLORS.VIBRANT_YELLOW_DARK,
      },
      ...themeBaseColors,
    },
    ...themeBase,
  },
  richPurple: {
    colors: {
      primary: {
        base: COLORS.DEEP_PURPLE,
        dark: darken(0.12, COLORS.DEEP_PURPLE),
      },
      secondary: {
        base: COLORS.VIBRANT_CYAN,
        dark: COLORS.VIBRANT_CYAN_DARK,
      },
      ...themeBaseColors,
    },
    ...themeBase,
  },
}

export const DEFAULT_THEME = THEMES.vibrantCyan
