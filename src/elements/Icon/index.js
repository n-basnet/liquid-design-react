import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { path } from 'ramda'

import iconsList from '~/elements/Icon/iconsList'
import { GLOBAL_CSS_PREFIX } from '~/utils/consts'
import { DEFAULT_THEME } from '~/utils/consts/themes'

export const ICON_CLASSNAME = `${GLOBAL_CSS_PREFIX}Icon`

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

export const DEFAULT_SIZE = 24

// exported separately for testing and storybook (without `withTheme` decorator)
export const Icon = ({
  name,
  size,
  style,
  theme,
  secondary,
  color,
  unit,
  onClick,
}) => {
  const SVGIconComponent = iconsList[name]
  if (SVGIconComponent === undefined) {
    return <code>invalid icon name</code>
  }
  const alternativeColor = path(color.split('.'), theme.colors) || color
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
      {SVGIconComponent && <SVGIconComponent />}
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
  /** (provided by `styled-components` via withTheme decorator) */
  theme: PropTypes.object,
  /** Use the theme's secondary color. Theme's primary color is the default. */
  secondary: PropTypes.bool,
  /** A different color - either from the theme (can be a path, like `grey.dark`) or a custom one (if not found in the theme) */
  color: PropTypes.string,
  /** Size unit */
  unit: PropTypes.string,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  size: DEFAULT_SIZE,
  style: {},
  theme: DEFAULT_THEME,
  secondary: false,
  color: '',
  unit: 'px',
  onClick: null,
}

export default withTheme(Icon)
