import Placeholder from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Placeholder', () => {
  const getPlaceholderWrapper = getWrapper(Placeholder)

  it('adds a grey background if image is not white', () => {
    const wrapperWithWhite = getPlaceholderWrapper({ isCircularWhite: true })
    expect(wrapperWithWhite.find(Placeholder).html()).not.toMatch('background-color')
    const wrapper = getPlaceholderWrapper()
    expect(wrapper.find(Placeholder).html()).toMatch('background-color')
  })

  everyComponentTestSuite(getPlaceholderWrapper, Placeholder, 'Placeholder')
})
