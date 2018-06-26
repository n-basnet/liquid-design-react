import COLORS from '~/utils/consts/colors'

export const THEMES = {
  vibrantCyan: {
    colors: {
      primary: COLORS.VIBRANT_CYAN,
      secondary: COLORS.VIBRANT_YELLOW,
    },
  },
  richPurple: {
    colors: {
      primary: COLORS.DEEP_PURPLE,
      secondary: COLORS.VIBRANT_CYAN,
    },
  },
}

export const DEFAULT_THEME = THEMES.vibrantCyan
