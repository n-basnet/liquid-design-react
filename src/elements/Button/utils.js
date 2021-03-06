import { path } from 'ramda'

export const bgColorSelector = (props, shade) => {
  const colorsMap = {
    primary: 'primary',
    secondary: 'sensitiveGrey',
    highlight: 'vibrantYellow',
  }
  if (props.appearance === 'secondary' && props.disabled) {
    return props.theme.colors.sensitiveGrey.light
  }
  return props.theme.colors[colorsMap[props.appearance]][shade]
}

export const colorSelector = props => {
  const colorsMap = {
    primary: ['white', 'base'],
    highlight: ['richBlack', 'base'],
    secondary: props.disabled
      ? ['sensitiveGrey', 'darkest']
      : ['primary', 'base'],
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
    secondary: '0.5',
    highlight: '0.3',
  }

  return opacityMap[props.appearance]
}
