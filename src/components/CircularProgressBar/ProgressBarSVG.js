import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'

import { GLOBAL_CSS_PREFIX } from '../../utils/consts'

const SVG_WIDTH = 100
const SVG_STROKE_WIDTH = 14
// due to stroke's linecaps, some minuscule values should be rounded up for display
const MIN_DISPLAYABLE_VALUE = Math.ceil(SVG_STROKE_WIDTH / 3)

const CircleShape = ({ isFull, maskId, ...props }) => (
  <circle
    cx={SVG_WIDTH / 2}
    cy={SVG_WIDTH / 2}
    r={SVG_WIDTH / 2}
    strokeWidth={SVG_STROKE_WIDTH}
    strokeLinecap={isFull ? 'square' : 'round'}
    fill="none"
    mask={`url(#${maskId})`}
    {...props}
  />
)

CircleShape.propTypes = {
  isFull: PropTypes.bool.isRequired,
  maskId: PropTypes.string.isRequired,
}

export default class ProgressBarSVG extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    color: PropTypes.object.isRequired,
  }

  id = `${GLOBAL_CSS_PREFIX}ProgressBarSVG--${uniqid()}`
  getNormalisedValue = () => {
    const { value } = this.props
    if (value !== 0 && value % 100 === 0) {
      return 100
    }
    return Math.max(value % 100, MIN_DISPLAYABLE_VALUE)
  }

  shouldDisplayFullCircle = () => {
    const { value } = this.props
    return value === 100 || value >= 200
  }

  getCircleLength = () => (2 * Math.PI * SVG_WIDTH) / 2
  getDashOffset = () => {
    const length = this.getCircleLength()
    const normalisedValue = this.getNormalisedValue()
    return length - ((length * normalisedValue) / 100 - SVG_STROKE_WIDTH)
  }

  render() {
    const { value, color } = this.props
    const isFull = this.shouldDisplayFullCircle()
    const isOverdue = value > 100
    const circleShapeProps = {
      maskId: this.id,
      isFull,
      strokeDasharray: this.getCircleLength(),
      stroke: color.main,
    }
    const dashOffset = isFull ? 0 : this.getDashOffset()
    const hideNonOverdueCircle = isOverdue || value <= 0
    return (
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_WIDTH}`}>
        <mask id={this.id}>
          <rect x="0" y="0" width={SVG_WIDTH} height={SVG_WIDTH} fill="black" />
          <circle
            cx={SVG_WIDTH / 2}
            cy={SVG_WIDTH / 2}
            r={SVG_WIDTH / 2}
            fill="white"
          />
        </mask>

        {/* background circle */}
        <CircleShape
          maskId={circleShapeProps.maskId}
          isFull
          stroke={color.background}
        />

        {/* two shapes to provide more intuitive animation */}
        <CircleShape
          {...circleShapeProps}
          strokeDashoffset={isOverdue ? 0 : dashOffset}
          {...(hideNonOverdueCircle && { stroke: 'transparent' })}
        />
        <CircleShape
          {...circleShapeProps}
          strokeDashoffset={isOverdue ? dashOffset : this.getCircleLength()}
          {...(!isOverdue && { stroke: 'transparent' })}
        />
      </svg>
    )
  }
}
