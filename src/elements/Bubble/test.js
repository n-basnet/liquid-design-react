import React from 'react'
import { shallow } from 'enzyme'

import Bubble, { Label } from '.'
import Icon from '~/elements/Icon'

describe('Bubble', () => {
  it('renders the label', () => {
    const label = 1

    const wrapper = shallow(<Bubble label={label} />)

    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(label.toString())
  })

  it('displays number 99 in the label if the number passed as label prop has more than two digits', () => {
    const label = 101
    const renderedLabel = '99'
    const wrapper = shallow(<Bubble label={label} />)

    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(renderedLabel)
  })

  it('renders the correct icon for the info bubble', () => {
    const icon = 'info'
    const wrapper = shallow(<Bubble isInfo />)

    expect(wrapper.find(Icon).prop('name')).toEqual(icon)
  })

  it('renders the correct icon for the warning bubble', () => {
    const icon = 'warning'
    const wrapper = shallow(<Bubble isWarning />)

    expect(wrapper.find(Icon).prop('name')).toEqual(icon)
  })
})
