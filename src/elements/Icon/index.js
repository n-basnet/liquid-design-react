import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { path } from 'ramda'

import iconsList from '~/elements/Icon/iconsList'
import { DEFAULT_THEME } from '~/utils/consts/themes'
import attachClassName from '~/components/aux/hoc/attachClassName'

export const IconWrapper = styled.div`
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

export const DEFAULT_SIZE = 24
export const DEFAULT_UNIT = 'px'

// exported separately for testing and storybook (without `withTheme` decorator)
export const Icon = ({ name, size, theme, secondary, color, unit, onClick, ...props }) => {
  const SVGIconComponent = iconsList[name]
  if (SVGIconComponent === undefined) {
    return <code>invalid icon name</code>
  }
  const alternativeColor = path(color.split('.'), theme.colors) || color
  const fill = alternativeColor || theme.colors[secondary ? 'secondary' : 'primary'].base

  return (
    <IconWrapper
      svgFill={fill}
      onClick={onClick}
      dimensions={{
        width: `${size}${unit}`,
        height: `${size}${unit}`,
      }}
      {...props}
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
  /** (provided by `styled-components` via withTheme decorator) */
  theme: PropTypes.object,
  /** Use the theme's secondary color. Theme's primary color is the default. */
  secondary: PropTypes.bool,
  /** A different color - either from the theme (can be a path, like `primary.dark`) or a custom one (if not found in the theme) */
  color: PropTypes.string,
  /** Size unit */
  unit: PropTypes.string,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  size: DEFAULT_SIZE,
  theme: DEFAULT_THEME,
  secondary: false,
  color: '',
  unit: DEFAULT_UNIT,
  onClick: null,
}

const { Component, globalClassName } = attachClassName(Icon)

export const ICON_CLASSNAME = globalClassName

export default withTheme(Component)
