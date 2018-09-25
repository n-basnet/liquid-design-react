import React from 'react'
import { shallow } from 'enzyme'
import RcSlider from 'rc-slider'

import Slider from '.'
import Label from '~/elements/Label'
import { SliderMax, SliderMin, SliderButton } from '~/components/Slider/SliderRanges'
import { Glyph } from '~/elements/Icon'

describe('Slider', () => {
  const defaultValue = 50
  const label = 'label'
  const min = 0
  const max = 100
  const minIconName = 'minus'
  const maxIconName = 'plus'
  const step = 1
  const wrapper = shallow(<Slider label={label} step={step} withIcon />)

  it('renders the label', () => {
    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(label)
  })

  it('renders the min value', () => {
    const wrapper = shallow(<Slider min={min} />)
    expect(
      wrapper
        .find(SliderMin)
        .children()
        .text()
    ).toBe(min.toString())
  })

  it('renders the max value', () => {
    const wrapper = shallow(<Slider max={max} />)
    expect(
      wrapper
        .find(SliderMax)
        .children()
        .text()
    ).toBe(max.toString())
  })

  it('renders the min icon', () => {
    expect(
      wrapper
        .find(SliderMin)
        .find(Glyph)
        .prop('name')
    ).toEqual(minIconName)
  })

  it('renders the max icon', () => {
    expect(
      wrapper
        .find(SliderMax)
        .find(Glyph)
        .prop('name')
    ).toEqual(maxIconName)
  })

  it('has a state "value" decreased after the minus is clicked', () => {
    const decrementResult = defaultValue - step
    const wrapper = shallow(
      <Slider defaultValue={defaultValue} label={label} step={step} withIcon />
    )

    wrapper
      .find(SliderMin)
      .find(SliderButton)
      .simulate('click')
    expect(wrapper.state('value')).toEqual(decrementResult)
  })

  it('has a state "value" increased after the plus is clicked', () => {
    const incrementedValue = defaultValue + step
    const wrapper = shallow(
      <Slider defaultValue={defaultValue} label={label} step={step} withIcon />
    )

    wrapper
      .find(SliderMax)
      .find(SliderButton)
      .simulate('click')
    expect(wrapper.state('value')).toEqual(incrementedValue)
  })

  it('updates the state "value" on change', () => {
    const valueChange = step
    const wrapper = shallow(
      <Slider defaultValue={defaultValue} label={label} step={step} withIcon />
    )

    wrapper.find(RcSlider).simulate('change', defaultValue + valueChange)
    expect(wrapper.state('value')).toBe(defaultValue + valueChange)
  })
})
