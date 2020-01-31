import { path, pick } from 'ramda'

import { getFirstTruthyKeyName } from '../utils/misc'

const getBarColor = props => {
  const colorsMap = {
    disabled: ['sensitiveGrey', 'darkest'],
    isOverdue: [props.useThemeColors ? 'secondary' : 'richRed', 'base'],
  }
  const defaultColor = [
    props.useThemeColors ? 'primary' : 'vibrantGreen',
    'base',
  ]
  return path(
    colorsMap[getFirstTruthyKeyName(pick(Object.keys(colorsMap), props))] ||
      defaultColor,
    props.theme.colors,
  )
}

export const getColors = props => {
  const { theme, isOverdue, disabled } = props
  const backgroundOverdueColor = props.useThemeColors
    ? ['secondary', 'lightest']
    : ['richRed', 'lightest']
  return {
    background: path(
      isOverdue && !disabled
        ? backgroundOverdueColor
        : ['sensitiveGrey', 'base'],
      theme.colors,
    ),
    main: getBarColor(props),
  }
}
