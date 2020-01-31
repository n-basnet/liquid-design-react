import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { path } from 'ramda'
import cx from 'classnames'

import iconsList from '../../elements/Icon/iconsList'
import { getClassName } from '../../components/misc/hoc/attachClassName'

export const ICON_CLASSNAME = getClassName({ name: 'Icon' })

const getFill = ({ theme, color, secondary }) =>
  path(color.split('.'), theme.colors) ||
  color ||
  theme.colors[secondary ? 'secondary' : 'primary'].base

const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
  ${props => css`
    ${props.onClick &&
      css`
        cursor: pointer;
      `};

    width: ${props.dimensions.width};
    height: ${props.dimensions.height};

    svg {
      position: absolute;
      top: 0;
      left: 0;
    }

    ${css([props.styledCSS])};
  `};
`

export const DEFAULT_SIZE = 24
export const DEFAULT_UNIT = 'px'

export const Icon = ({
  name,
  size,
  unit,
  onClick,
  isFilled,
  className,
  noFill,
  ...props
}) => {
  const SVGIconComponent =
    iconsList.glyphs[name] ||
    (isFilled ? iconsList.filled[name] : iconsList.stroke[name])
  if (SVGIconComponent === undefined) {
    return <code>invalid icon name</code>
  }
  const dimensions = {
    width: `${size}${unit}`,
    height: `${size}${unit}`,
  }

  const svgProps = {
    ...dimensions,
    ...(!noFill && { fill: getFill(props) }),
  }

  return (
    <IconWrapper
      onClick={onClick}
      dimensions={dimensions}
      className={cx(className, ICON_CLASSNAME)}
      {...props}
    >
      <SVGIconComponent {...svgProps} />
    </IconWrapper>
  )
}

Icon.propTypes = {
  /** Name of the icon. Refer to docs for a full list of available icons */
  name: PropTypes.string.isRequired,
  /** Check if the Icon is filled. */
  isFilled: PropTypes.bool,
  /** Icon's side dimension (by default in pixels - see `unit` prop) */
  size: PropTypes.number,
  /** Use the theme's secondary color. Theme's primary color is the default. */
  secondary: PropTypes.bool,
  /** A different color - either from the theme (can be a path, like `primary.dark`) or a custom one (if not found in the theme) */
  color: PropTypes.string,
  /** Size unit */
  unit: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  noFill: PropTypes.bool,
  /** styling to be passed to `styled-components` instance */
  styledCSS: PropTypes.array,
}

Icon.defaultProps = {
  isFilled: false,
  size: DEFAULT_SIZE,
  secondary: false,
  color: '',
  unit: DEFAULT_UNIT,
  onClick: null,
  className: null,
  noFill: false,
  styledCSS: [],
}

export const Glyph = withTheme(Icon)

export default withTheme(Icon)
