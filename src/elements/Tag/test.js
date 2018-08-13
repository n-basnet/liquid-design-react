import React from 'react'
import { shallow } from 'enzyme'

import Tag from '.'

describe('Tag', () => {
  const label = 'Tag'
  const iconNodeIndex = 1
  const onClickMock = jest.fn()
  const wrapper = shallow(<Tag label={label} onClick={onClickMock} />)

  it('renders the label', () => {
    expect(wrapper.text()).toMatch(label)
  })

  it('renders a correct default icon named "close"', () => {
    expect(
      wrapper
        .find('div')
        .childAt(iconNodeIndex)
        .prop('name')
    ).toBe('close')
  })

  it('handles a click event', () => {
    wrapper
      .find('div')
      .childAt(iconNodeIndex)
      .simulate('click')
    expect(onClickMock).toBeCalled()
  })
})
