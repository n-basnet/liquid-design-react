import React from 'react'
import PropTypes from 'prop-types'

import { times } from '~/utils/aux'
import Step from '~/components/Ratings/Step'

class Ratings extends React.Component {
  state = {
    hovered: null,
  }
  static propTypes = {
    steps: PropTypes.number,
    rating: PropTypes.number,
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    dots: PropTypes.bool,
  }
  render () {
    const { onSubmit, rating = 0, steps = 5, disabled, dots } = this.props
    const interactive = onSubmit && !disabled
    return (
      <div
        onMouseLeave={() => this.setState({ hovered: null })}
        style={{ display: 'inline-block' }}
      >
        {times(steps).map(v => (
          <Step
            key={v}
            disabled={disabled}
            dots={dots}
            hovered={interactive && this.state.hovered !== null && v <= this.state.hovered}
            rated={rating >= v + 1}
            halfIcon={rating !== v + 1 && Math.round(rating) === v + 1}
            onMouseEnter={interactive && (() => this.setState({ hovered: v }))}
            onClick={interactive && (() => onSubmit(v + 1))}
          />
        ))}
      </div>
    )
  }
}

export default Ratings
