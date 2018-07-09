import { rgba, darken } from 'polished'

import COLORS from '~/utils/consts/colors'

const themeBase = {
  borderRadius: '6px',
  fontFamily: `'Lato', sans-serif`,
  transition: 'all 200ms',
  boxShadow: `0 10px 20px ${rgba(COLORS.BLACK, 0.1)}, 0 2px 4px ${rgba(COLORS.BLACK, 0.05)}`,
  doubleBoxShadow: `0 0 20px ${rgba(COLORS.BLACK, 0.2)}, 0 30px 60px ${rgba(COLORS.BLACK, 0.3)}`,
}

const themeBaseColors = {
  white: COLORS.WHITE,
  grey: COLORS.GREY,
  darkGrey: COLORS.DARK_GREY,
}

export const THEMES = {
  vibrantCyan: {
    colors: {
      primary: {
        base: COLORS.VIBRANT_CYAN,
        dark: darken(0.12, COLORS.VIBRANT_CYAN),
      },
      secondary: {
        base: COLORS.VIBRANT_YELLOW,
        dark: darken(0.12, COLORS.VIBRANT_YELLOW),
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
        dark: darken(0.12, COLORS.VIBRANT_CYAN),
      },
      ...themeBaseColors,
    },
    ...themeBase,
  },
}

export const DEFAULT_THEME = THEMES.vibrantCyan
