import Placeholder from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Placeholder', () => {
  const getPlaceholderWrapper = getWrapper(Placeholder)

  it('adds a grey background if image is not circular', () => {
    const wrapperWithCircular = getPlaceholderWrapper({ isCircular: true })
    expect(wrapperWithCircular.find(Placeholder).html()).not.toMatch('background-color')
    const wrapper = getPlaceholderWrapper({ isRectangular: true })
    expect(wrapper.find(Placeholder).html()).toMatch('background-color')
  })

  everyComponentTestSuite(getPlaceholderWrapper, Placeholder, 'Placeholder')
})
