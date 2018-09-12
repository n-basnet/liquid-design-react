import React from 'react'
import ReactDOMServer from 'react-dom/server'

export const times = n => Object.keys([...Array(n)]).map(v => parseInt(v))

export const camelCaseToHuman = string =>
  string.replace(/([A-Z]+)/g, ' $1').replace(/^\w/, c => c.toUpperCase())

export const getReactElementString = Component =>
  ReactDOMServer.renderToStaticMarkup(<Component />)

export const getSVGImageURLString = (string, { dimensions }) => {
  if (string.indexOf('xmlns=') < 0) {
    // xmlns will be removed by library's SVG loader,
    // but it might not by the SVG loader provided by the user
    string = string.replace(/<svg/, `<svg xmlns='http://www.w3.org/2000/svg'`)
  }
  string = string.replace(
    /<svg/,
    `<svg
    width='${dimensions[0]}px'
    height='${dimensions[1]}px'
  `
  )
  return `data:image/svg+xml,${encodeURIComponent(string)}`
}
