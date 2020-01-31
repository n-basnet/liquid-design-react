import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { times } from '../../utils/misc'
import Step from '../../components/Rating/Step'
import attachClassName from '../../components/misc/hoc/attachClassName'

export const roundToNearest = (value, number = 0.5) => {
  const remainder = value % number
  return remainder > 0 ? value - remainder + number : value
}

export class Rating extends PureComponent {
  static propTypes = {
    /** amount of stars/dots to display */
    steps: PropTypes.number,
    rating: PropTypes.number,
    /** submit handler - if provided, the component will be interactive */
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    /** different shape of single step - dot instead of default star */
    dots: PropTypes.bool,
    style: PropTypes.object,
  }

  static defaultProps = {
    steps: 5,
    rating: 0,
    disabled: false,
    dots: false,
    onSubmit: null,
    style: {},
  }

  state = {
    hovered: null,
  }

  render() {
    const {
      onSubmit,
      rating,
      steps,
      disabled,
      dots,
      style,
      ...props
    } = this.props
    const isInteractive = onSubmit && !disabled
    const roundedRating = roundToNearest(rating)
    const isHalf = index =>
      roundedRating !== index && Math.round(roundedRating) === index
    return (
      <div
        onMouseLeave={() => this.setState({ hovered: null })}
        style={{ display: 'inline-block', ...style }}
        {...props}
      >
        {times(steps).map(index => {
          const normalisedIndex = index + 1
          return (
            <Step
              key={index}
              disabled={disabled}
              dots={dots}
              hovered={
                isInteractive &&
                this.state.hovered !== null &&
                index <= this.state.hovered
              }
              rated={roundedRating >= normalisedIndex}
              isHalfIcon={isHalf(normalisedIndex)}
              onMouseEnter={
                isInteractive
                  ? () => this.setState({ hovered: index })
                  : undefined
              }
              onClick={
                isInteractive ? () => onSubmit(normalisedIndex) : undefined
              }
            />
          )
        })}
      </div>
    )
  }
}

const { Component } = attachClassName(Rating)

export default Component
