import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { number } from '@storybook/addon-knobs'

import { Rating } from '~'
import { getBackgroundWrapper } from '../helpers'

const firstRating = 2.5

const SectionText = styled.div`
  margin-top: 10px;
`

class RatingApp extends PureComponent {
  static propTypes = {
    dots: Rating.propTypes.dots,
    steps: Rating.propTypes.steps,
  }
  static defaultProps = {
    dots: Rating.defaultProps.dots,
    steps: Rating.defaultProps.steps,
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
    const newRatingAmount = ratingsAmount + 1
    const newRatingSum = newRating + ratingsSum

    this.setState({
      rating: Math.round(newRatingSum / newRatingAmount * 100) / 100,
      ratingsSum: newRatingSum,
      ratingsAmount: newRatingAmount,
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
        <Rating rating={rating} dots={dots} steps={steps} />
        <SectionText>interactive rating:</SectionText>
        <Rating
          onSubmit={this.addRating}
          dots={dots}
          steps={steps}
          rating={lastRating}
          disabled={disabled}
        />
        <SectionText>ratings #: {ratingsAmount}</SectionText>
        disabled:
        <input type='checkbox' checked={disabled} onClick={this.toggleDisabled} />
      </div>
    )
  }
}

storiesOf('Components/Rating', module)
  .addDecorator(getBackgroundWrapper())
  .add('single', () => <Rating />)
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [RatingApp],
    },
  })
  .add('default', () => (
    <RatingApp steps={number('steps', 5, { range: true, min: 1, max: 10, step: 1 })} />
  ))
  .add('dots', () => <RatingApp dots />)
