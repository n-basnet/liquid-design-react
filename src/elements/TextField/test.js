import React from 'react'
import { mount } from 'enzyme'

import Theme from '~/Theme'
import TextField, { LabelWrapper } from '.'

describe('TextField', () => {
  const getWrapper = props =>
    mount(
      <Theme>
        <TextField {...props} />
      </Theme>
    )
  const defaultProps = {
    label: 'Some label',
    placeholder: 'Some placeholder',
  }
  it('renders an input with placeholder and label', () => {
    const wrapper = getWrapper(defaultProps)
    expect(wrapper.find('input').prop('placeholder')).toEqual(defaultProps.placeholder)
    expect(wrapper.find(LabelWrapper).text()).toEqual(defaultProps.label)
  })
  it('renders a textarea if multiline prop is passed', () => {
    const wrapper = getWrapper({ multiline: true })
    expect(wrapper.find('input').length).toEqual(0)
    expect(wrapper.find('textarea').length).toEqual(1)
  })
  it('assigns id and htmlFor attributes to input and label', () => {
    const wrapper = getWrapper(defaultProps)
    expect(wrapper.find(LabelWrapper).prop('htmlFor')).toEqual(wrapper.find('input').prop('id'))
  })
  it('passes disabled prop', () => {
    const wrapper = getWrapper({ disabled: true })
    expect(wrapper.find('input').prop('disabled')).toEqual(true)
  })
})
