import Badge from '.'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Badge', () => {
  const text = 'Some text'
  const getBadgeWrapper = getWrapper(Badge, { children: text })

  it('displays text', () => {
    expect(
      getBadgeWrapper()
        .find(Badge)
        .text(),
    ).toEqual(text)
  })

  everyComponentTestSuite(getBadgeWrapper, Badge, 'Badge')
})
