import React from 'react'
import { shallow } from 'enzyme'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import Badge from '.'

describe('Badge', () => {
  it('displays text', () => {
    const text = 'Some text'
    const wrapper = shallow(<Badge text={text} />)
    expect(wrapper.html()).toMatch(text)
  })
  it('has the default theme in props', () => {
    const wrapper = shallow(<Badge text='hello' />)
    expect(wrapper.props().theme).toEqual(DEFAULT_THEME)
  })
})
