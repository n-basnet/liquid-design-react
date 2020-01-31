import Card from '.'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Card', () => {
  const defaultProps = {
    children: 'Some content',
    onClick: jest.fn(),
  }
  const getCardWrapper = getWrapper(Card, defaultProps)
  it('renders content', () => {
    const wrapper = getCardWrapper().find(Card)
    expect(wrapper.text()).toEqual(defaultProps.children)
  })
  it('handles click', () => {
    const wrapper = getCardWrapper().find(Card)
    wrapper.simulate('click')
    expect(defaultProps.onClick).toBeCalled()
  })
  everyComponentTestSuite(getCardWrapper, Card, 'Card')
})
