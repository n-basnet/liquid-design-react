import { SCREEN_SIZES } from '../../utils/styling'
export const isMobile = () => {
  if (typeof document === 'undefined') return
  return document.body.clientWidth <= SCREEN_SIZES.phone
}
export const isIE11 = () => {
  if (typeof document === 'undefined') return
  return !!window.MSInputMethodContext && !!document.documentMode
}
