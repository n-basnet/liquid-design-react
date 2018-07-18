import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import { Ratings } from '~'
import { getBackgroundWrapper } from '../helpers'

const firstRating = 2.5

const SectionText = styled.div`
  margin-top: 10px;
`

class RatingsApp extends React.Component {
  state = {
    rating: firstRating,
    ratingsSum: firstRating,
    ratingsAmount: 1,
    lastRating: null,
    disabled: false,
  }
  static propTypes = {
    dots: Ratings.propTypes.dots,
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
    const { dots } = this.props
    return (
      <div>
        <SectionText>official rating ({rating}):</SectionText>
        <Ratings rating={rating} dots={dots} />
        <SectionText>interactive rating:</SectionText>
        <Ratings
          onSubmit={this.addRating}
          dots={dots}
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
  .add('default', () => <RatingsApp />)
  .add('dots', () => <RatingsApp dots />)
  .add('single', () => <Ratings />)
