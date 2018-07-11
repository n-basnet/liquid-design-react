import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'

import ICONS from '~/elements/Icon/iconsList'

// exported separately for testing and storybook (without `withTheme` decorator)
export const Icon = ({
  name,
  size = 14,
  style = {},
  theme,
  secondary,
  color,
  unit = 'px',
  onClick,
}) => {
  const SVGIconComponent = ICONS[name]
  if (!SVGIconComponent) {
    return <code>invalid icon name</code>
  }
  const alternativeColor = theme.colors[color] || color
  const fill = alternativeColor || theme.colors[secondary ? 'secondary' : 'primary'].base
  return (
    <SVGIconComponent
      width={`${size}${unit}`}
      height={`${size}${unit}`}
      style={{
        fill,
        ...onClick && { cursor: 'pointer' },
        ...style,
      }}
      onClick={onClick}
    />
  )
}

Icon.propTypes = {
  /** Name of the icon. Refer to docs for a full list of available icons */
  name: PropTypes.string.isRequired,
  /** Icon's side dimension (by default in pixels - see `unit` prop) */
  size: PropTypes.number,
  /** Style object to be passed to inlined SVG */
  style: PropTypes.object,
  /** (provided by `styled-components`) */
  theme: PropTypes.object,
  /** Use the theme's secondary color. Theme's primary color is the default. */
  secondary: PropTypes.bool,
  /** A different color - either from the theme or a custom one (if not found in the theme) */
  color: PropTypes.string,
  /** Size unit */
  unit: PropTypes.string,
  onClick: PropTypes.func,
}

export default withTheme(Icon)
