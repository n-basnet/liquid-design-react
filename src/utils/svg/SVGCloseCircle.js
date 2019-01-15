import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'

import { times } from '~/utils/misc'

const ROTATION_ORIGIN = '0 0'
const CLOSE_CIRCLE_RADIUS = 10

const position = {
  cx: 0,
  cy: 0,
}

const CloseIcon = ({ theme, strokeWidth, strokeLinecap, ...props }) => (
  <g
    stroke={theme.colors.richBlack.base}
    strokeWidth={strokeWidth}
    strokeLinecap={strokeLinecap}
    style={{ transition: 'none' }}
  >
    {times(2).map(v => (
      <line key={v} {...props} transform={`rotate(${v === 0 ? 45 : 135} ${ROTATION_ORIGIN})`} />
    ))}
  </g>
)

CloseIcon.propTypes = {
  theme: PropTypes.object.isRequired,
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.string,
}

CloseIcon.defaultProps = {
  strokeWidth: 1,
  strokeLinecap: 'round',
}

const CloseIconWithTheme = withTheme(CloseIcon)

const getOffset = radius => radius * 0.54
const SVGCloseCircle = ({ radius, ...props }) => (
  <g {...props}>
    <circle {...position} r={radius} fill='white' />
    <CloseIconWithTheme
      x1={position.cx - radius + getOffset(radius)}
      y1={position.cy}
      x2={position.cx + radius - getOffset(radius)}
      y2={position.cy}
      strokeWidth={radius * 0.1}
    />
  </g>
)

SVGCloseCircle.propTypes = {
  radius: PropTypes.number,
}

SVGCloseCircle.defaultProps = {
  radius: CLOSE_CIRCLE_RADIUS,
}

export default SVGCloseCircle
