import { SCREEN_SIZES } from '../../utils/styling'
export const isMobile = () => document.body.clientWidth <= SCREEN_SIZES.phone
export const isIE11 = () =>
  !!window.MSInputMethodContext && !!document.documentMode
