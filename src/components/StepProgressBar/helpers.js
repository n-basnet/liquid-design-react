import { pick, path } from 'ramda'

import { getFirstTruthyKeyName } from '../../utils/misc'

const glyphNameSuffixMap = {
  done: 'CheckMark',
  disabled: 'Disabled',
  current: 'Indicator',
}
const defaultSuffix = 'ComingUp'
const glyphNameBase = 'progressBar'
export const getGlyphName = state =>
  `${glyphNameBase}${glyphNameSuffixMap[getFirstTruthyKeyName(state)] ||
    defaultSuffix}`

const colorsMap = {
  disabled: ['sensitiveGrey', 'dark'],
  comingUp: ['sensitiveGrey', 'darkest'],
}
const defaultColor = ['primary', 'base']
export const getColor = props => {
  const colorProps = pick(Object.keys(colorsMap), props)
  return path(
    colorsMap[getFirstTruthyKeyName(colorProps)] || defaultColor,
    props.theme.colors,
  )
}
