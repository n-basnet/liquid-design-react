import React from 'react'
import RcSlider from 'rc-slider'
import { shallow } from 'enzyme'

import Slider from '.'
import Label from '~/elements/Label'
import { SliderMax, SliderMin, SliderButton } from '~/components/Slider/SliderRanges'
import { Tooltip } from '~/components/Slider/Tooltip'
import { Glyph } from '~/elements/Icon'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Slider', () => {
  const defaultValue = 50
  const label = 'label'
  const min = 0
  const max = 100
  const minIconName = 'minus'
  const maxIconName = 'plus'
  const step = 1

  const defaultProps = {
    label,
    step,
  }

  const getSliderWrapper = getWrapper(Slider, defaultProps)

  it('renders the label', () => {
    const wrapper = getSliderWrapper()
    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(label)
  })

  it('renders the min value', () => {
    const wrapper = getSliderWrapper({ min })
    expect(wrapper.find(SliderMin).text()).toBe(min.toString())
  })

  it('renders the max value', () => {
    const wrapper = getSliderWrapper({ max })
    expect(wrapper.find(SliderMax).text()).toBe(max.toString())
  })

  it('renders the min and max icons', () => {
    const wrapper = getSliderWrapper({ withButtons: true })
    expect(
      wrapper
        .find(SliderMin)
        .find(Glyph)
        .prop('name')
    ).toBe(minIconName)
    expect(
      wrapper
        .find(SliderMax)
        .find(Glyph)
        .prop('name')
    ).toBe(maxIconName)
  })

  it('updates value after the minus is clicked', () => {
    const wrapper = getSliderWrapper({ withButtons: true, defaultValue })
    const decrementResult = defaultValue - step

    wrapper
      .find(SliderMin)
      .find(SliderButton)
      .simulate('click')
    expect(wrapper.find(Tooltip).text()).toBe(decrementResult.toString())
  })

  it('updates value after the plus is clicked', () => {
    const incrementedValue = defaultValue + step
    const wrapper = getSliderWrapper({ withButtons: true, defaultValue })

    wrapper
      .find(SliderMax)
      .find(SliderButton)
      .simulate('click')
    expect(wrapper.find(Tooltip).text()).toBe(incrementedValue.toString())
  })

  it('updates the value on change', () => {
    const updatedValue = defaultValue + step
    const wrapper = shallow(
      <Slider defaultValue={defaultValue} label={label} step={step} withButtons />
    )

    wrapper.find(RcSlider).simulate('change', updatedValue)
    expect(wrapper.state('value')).toBe(updatedValue)
    expect(
      wrapper
        .find(Tooltip)
        .children()
        .text()
    ).toBe(updatedValue.toString())
  })

  everyComponentTestSuite(getSliderWrapper, Slider, 'Slider')
})
