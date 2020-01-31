import { path } from 'ramda'

import Icon, { DEFAULT_SIZE, DEFAULT_UNIT } from '.'
import { DEFAULT_THEME } from '../../utils/consts/themes'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Icon', () => {
  const defaultProps = { name: 'bottle' }
  const getIconWrapper = getWrapper(Icon, defaultProps)

  const EXPECTED_SIZE = `${DEFAULT_SIZE}${DEFAULT_UNIT}`
  it(`sets default size of ${EXPECTED_SIZE}`, () => {
    const wrapper = getIconWrapper().find('svg')
    expect(wrapper.prop('width')).toEqual(EXPECTED_SIZE)
  })

  it('handles click event', () => {
    const onClick = jest.fn()
    const wrapper = getIconWrapper({ onClick }).find(Icon)
    wrapper.simulate('click')
    expect(onClick).toBeCalled()
  })

  it('handles theme colors', () => {
    ;['black.base', 'richBlue.dark'].map(color => {
      const wrapper = getIconWrapper({ color }).find('svg')
      expect(wrapper.prop('fill')).toEqual(
        path(color.split('.'), DEFAULT_THEME.colors),
      )
    })
  })

  it('handles custom colors', () => {
    ;['#243cdb', '#33c622'].map(color => {
      const wrapper = getIconWrapper({ color }).find('svg')
      expect(wrapper.prop('fill')).toEqual(color)
    })
  })

  it('assigns primary color by default', () => {
    const wrapper = getIconWrapper().find('svg')
    expect(wrapper.prop('fill')).toEqual(DEFAULT_THEME.colors.primary.base)
  })

  it('assigns secondary color', () => {
    const wrapper = getIconWrapper({ secondary: true }).find('svg')
    expect(wrapper.prop('fill')).toEqual(DEFAULT_THEME.colors.secondary.base)
  })

  it('handles invalid name', () => {
    const wrapper = getIconWrapper({
      name: 'this is never going to be an icon name',
    }).find(Icon)
    expect(wrapper.text()).toMatch('invalid icon')
    expect(wrapper).toBeTruthy()
  })

  everyComponentTestSuite(getIconWrapper, Icon, 'Icon')
})
