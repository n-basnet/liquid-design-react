import { path } from 'ramda'

export const bgColorSelector = (props, shade) => {
  const colorsMap = {
    primary: 'primary',
    secondary: 'sensitiveGrey',
    highlight: 'vibrantYellow',
  }
  return props.theme.colors[colorsMap[props.appearance]][shade]
}

export const colorSelector = props => {
  if (props.appearance === 'secondary' && props.disabled) {
    return props.theme.colors.sensitiveGrey.darker
  }
  if (props.appearance === 'secondary') {
    return props.theme.colors.primary.base
  }
  const colorsMap = {
    primary: ['white', 'base'],
    highlight: ['richBlack', 'base'],
  }
  return path(colorsMap[props.appearance], props.theme.colors)
}

export const opacitySelector = props => {
  const opacityMap = {
    primary: '0.5',
    secondary: '1',
    highlight: '0.3',
  }

  return opacityMap[props.appearance]
}

export const iconOpacitySelector = props => {
  const opacityMap = {
    primary: '0.5',
    secondary: '0.3',
    highlight: '0.3',
  }

  return opacityMap[props.appearance]
}
