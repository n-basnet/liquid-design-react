import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'

import ICONS from '~/elements/Icon/iconsList'
import { GLOBAL_CLASSNAME_PREFIX } from '~/utils/consts'

export const ICON_CLASSNAME = `${GLOBAL_CLASSNAME_PREFIX}Icon`

const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
  ${props => css`
    ${props.onClick &&
      css`
        cursor: pointer;
      `};
    &,
    svg {
      width: ${props.dimensions.width};
      height: ${props.dimensions.height};
    }
    svg {
      fill: ${props.svgFill};
      position: absolute;
      top: 0;
      left: 0;
    }
  `};
`

// exported separately for testing and storybook (without `withTheme` decorator)
export const Icon = ({
  name,
  size = 24,
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
  const fill =
    alternativeColor || theme.colors[secondary ? 'secondary' : 'primary'].base
  return (
    <IconWrapper
      className={ICON_CLASSNAME}
      svgFill={fill}
      onClick={onClick}
      dimensions={{
        width: `${size}${unit}`,
        height: `${size}${unit}`,
      }}
      style={style}
    >
      <SVGIconComponent />
    </IconWrapper>
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
