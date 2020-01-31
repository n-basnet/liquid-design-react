import Rating, { roundToNearest } from '.'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Rating', () => {
  const getRatingWrapper = getWrapper(Rating, { title: 'Some title' })
  everyComponentTestSuite(getRatingWrapper, Rating, 'Rating')
})

it('roundToNearest', () => {
  ;[
    { input: 1.3, output: 1.5 },
    { input: 2.5, output: 2.5 },
    { input: 3.51, output: 4 },
    { input: 3.91, output: 4 },
  ].map(item => {
    expect(roundToNearest(item.input)).toEqual(item.output)
  })
})
