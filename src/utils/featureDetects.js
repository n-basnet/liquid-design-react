// Copyright (c) Modernizr
// Modernizr does not support use without assigning itself to window object,
// and as this is a library, we should not hijack user's own global Modernizr.
export const hasCSSFilters = () => {
  var el = document.createElement('a')
  el.style.cssText = 'filter: blur(2px);'
  const IE9DocumentMode = 9
  return (
    !!el.style.length &&
    (document.documentMode === undefined || document.documentMode > IE9DocumentMode)
  )
}
