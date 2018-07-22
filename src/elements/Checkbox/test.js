import React from 'react'
import { shallow } from 'enzyme'

import Checkbox, { Label } from '.'

describe('Checkbox', () => {
  const label = 'Checkbox text'
  const wrapper = shallow(<Checkbox label={label} />)

  it('displays the correct label', () => {
    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(label)
  })

  it('has a state "filled" equal to true after the checkbox is clicked', () => {
    wrapper.simulate('click')
    expect(wrapper.state('filled')).toEqual(true)
  })

  it('has a state "hover" equal to true triggered by the onMouseEnter event', () => {
    wrapper.simulate('mouseenter')
    expect(wrapper.state('hover')).toEqual(true)
  })

  it('has a state "hover" equal to false triggered by the onMouseLeave event', () => {
    wrapper.simulate('mouseleave')
    expect(wrapper.state('hover')).toEqual(false)
  })
})
