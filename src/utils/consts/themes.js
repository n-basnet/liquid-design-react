import { rgba } from 'polished'

import COLORS from '~/utils/consts/colors'

const themeBase = {
  borderRadius: '6px',
  fontFamily: `'Lato', sans-serif`,
  transition: 'all 200ms',
  boxShadow: `0 0 20px ${rgba(COLORS.BLACK, 0.2)}`,
  doubleBoxShadow: `0 0 20px ${rgba(COLORS.BLACK, 0.2)}, 0 30px 60px ${rgba(COLORS.BLACK, 0.3)}`,
}

const themeBaseColors = {
  white: COLORS.WHITE,
}

export const THEMES = {
  vibrantCyan: {
    colors: {
      primary: COLORS.VIBRANT_CYAN,
      secondary: COLORS.VIBRANT_YELLOW,
      ...themeBaseColors,
    },
    ...themeBase,
  },
  richPurple: {
    colors: {
      primary: COLORS.DEEP_PURPLE,
      secondary: COLORS.VIBRANT_CYAN,
      ...themeBaseColors,
    },
    ...themeBase,
  },
}

export const DEFAULT_THEME = THEMES.vibrantCyan
