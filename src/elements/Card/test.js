import Card from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Card', () => {
  const defaultProps = {
    children: 'Some content',
  }
  const getCardWrapper = getWrapper(Card, defaultProps)
  it('renders content', () => {
    const wrapper = getCardWrapper().find(Card)
    expect(wrapper.text()).toEqual(defaultProps.children)
  })
  everyComponentTestSuite(getCardWrapper, Card, 'Card')
})
