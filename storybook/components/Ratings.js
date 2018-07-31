import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { number } from '@storybook/addon-knobs'

import { Ratings } from '~'
import { getBackgroundWrapper } from '../helpers'

const firstRating = 2.5

const SectionText = styled.div`
  margin-top: 10px;
`

class RatingsApp extends PureComponent {
  static propTypes = {
    dots: Ratings.propTypes.dots,
    steps: Ratings.propTypes.steps,
  }
  static defaultProps = {
    dots: Ratings.defaultProps.dots,
    steps: Ratings.defaultProps.steps,
  }
  state = {
    rating: firstRating,
    ratingsSum: firstRating,
    ratingsAmount: 1,
    lastRating: null,
    disabled: false,
  }
  addRating = newRating => {
    const { ratingsSum, ratingsAmount } = this.state
    const newRatingsAmount = ratingsAmount + 1
    const newRatingsSum = newRating + ratingsSum

    this.setState({
      rating: Math.round(newRatingsSum / newRatingsAmount * 100) / 100,
      ratingsSum: newRatingsSum,
      ratingsAmount: newRatingsAmount,
      lastRating: newRating,
    })
  }
  toggleDisabled = () => {
    this.setState(({ disabled }) => ({
      disabled: !disabled,
      ...(!disabled && { lastRating: null }),
    }))
  }
  render() {
    const { rating, lastRating, ratingsAmount, disabled } = this.state
    const { dots, steps } = this.props
    return (
      <div>
        <SectionText>official rating ({rating}):</SectionText>
        <Ratings rating={rating} dots={dots} steps={steps} />
        <SectionText>interactive rating:</SectionText>
        <Ratings
          onSubmit={this.addRating}
          dots={dots}
          steps={steps}
          rating={lastRating}
          disabled={disabled}
        />
        <SectionText>ratings #: {ratingsAmount}</SectionText>
        disabled:
        <input
          type='checkbox'
          checked={disabled}
          onClick={this.toggleDisabled}
        />
      </div>
    )
  }
}

storiesOf('Components/Ratings', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [RatingsApp],
    },
  })
  .add('default', () => (
    <RatingsApp
      steps={number('steps', 5, { range: true, min: 1, max: 10, step: 1 })}
    />
  ))
  .add('dots', () => <RatingsApp dots />)
  .add('single', () => <Ratings />)
