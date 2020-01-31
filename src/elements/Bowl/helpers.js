import { SVG_VIEWPORT_WIDTH } from '../../elements/Bowl/consts'

export const getSVGFillCoordinates = (
  theta,
  xspacing,
  amplitude,
  pathGen,
  dx,
  coords = 'M0 0',
  offset = 0,
) => {
  let x = theta
  for (let i = 0; i < SVG_VIEWPORT_WIDTH; i += xspacing) {
    coords += `L ${i} ${pathGen(x) * amplitude + offset} `
    x += dx
  }
  return `${coords} L${SVG_VIEWPORT_WIDTH}, 34 L${SVG_VIEWPORT_WIDTH}, ${SVG_VIEWPORT_WIDTH} L1, ${SVG_VIEWPORT_WIDTH} Z`
}
