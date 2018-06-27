import { rgba } from 'polished'

import COLORS from '~/utils/consts/colors'

export const borderRadius = '6px'
export const fontFamily = 'sans-serif'
export const transition = 'all 200ms'
export const boxShadow = `0 0 20px ${rgba(COLORS.BLACK, 0.2)}`
export const doubleBoxShadow = `0 0 20px ${rgba(COLORS.BLACK, 0.2)}, 0 30px 60px ${rgba(COLORS.BLACK, 0.3)}`
