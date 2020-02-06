// Copyright (c) Modernizr
// Modernizr does not support use without assigning itself to window object,
// and as this is a library, we should not hijack user's own global Modernizr.
export const hasCSSFilters = () => {
  if (typeof document === 'undefined') return
  const el = document.createElement('a')
  el.style.cssText = 'filter: blur(2px);'
  const IE9DocumentMode = 9
  return (
    !!el.style.length &&
    (document.documentMode === undefined ||
      document.documentMode > IE9DocumentMode)
  )
}

export const isTouchDevice = () => {
  if (typeof document === 'undefined') return
  return 'ontouchstart' in document.documentElement
}

// MS Edge also has a window.chrome object, but w/out csi
export const isChromeBrowser = () => {
  if (typeof document === 'undefined') return
  return !!(window.chrome && window.chrome.csi)
}
