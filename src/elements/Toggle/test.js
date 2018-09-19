import { Glyph } from '~/elements/Icon'
import Toggle from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Toggle', () => {
  const getToggleWrapper = getWrapper(Toggle)
  it('renders', () => {
    expect(getToggleWrapper()).toBeTruthy()
  })
  it('renders icons', () => {
    const iconNames = ['circleX', 'circleX']
    const wrapper = getToggleWrapper({ icons: iconNames })
    expect(wrapper.find(Glyph).length).toEqual(iconNames.length)
  })
  it('handles onClick', () => {
    const onClick = jest.fn()
    const wrapper = getToggleWrapper({ onClick })
    wrapper.find(Toggle).simulate('click')
    expect(onClick).toBeCalled()
  })

  everyComponentTestSuite(getToggleWrapper, Toggle, 'Toggle')
})
