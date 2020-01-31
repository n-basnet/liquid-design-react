import CircularProgressBar, { LabelWrapper, ValueWrapper } from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'
import { DEFAULT_THEME } from '../../utils/consts/themes'

describe('CircularProgressBar', () => {
  const getCircularProgressBarWrapper = getWrapper(CircularProgressBar)
  const value = 42
  const label = 'some label'

  it('displays value and label', () => {
    const wrapper = getCircularProgressBarWrapper({ value, label })
    expect(wrapper.find(ValueWrapper).text()).toBe(`${value}%`)
    expect(wrapper.find(LabelWrapper).text()).toBe(label)
  })

  it('renders SVG with mask', () => {
    const wrapper = getCircularProgressBarWrapper({ value })
    const svgMaskId = wrapper.find('mask').prop('id')
    expect(
      wrapper
        .find('circle')
        .last()
        .prop('mask'),
    ).toMatch(svgMaskId)
  })

  it('applies correct colors', () => {
    expect(
      getCircularProgressBarWrapper({ value: 42 })
        .find(ValueWrapper)
        .prop('textColor'),
    ).toBe(DEFAULT_THEME.colors.vibrantGreen.base)
    expect(
      getCircularProgressBarWrapper({ value: 142 })
        .find(ValueWrapper)
        .prop('textColor'),
    ).toBe(DEFAULT_THEME.colors.richRed.base)
  })

  everyComponentTestSuite(
    getCircularProgressBarWrapper,
    CircularProgressBar,
    'CircularProgressBar',
  )
})
