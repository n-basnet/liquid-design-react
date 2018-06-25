import React from 'react'
import { shallow } from 'enzyme'

import { Badge } from '.'

describe('Badge', () => {
  it('displays text', () => {
    const text = 'Some text'
    const wrapper = shallow(<Badge text={text} />)
    expect(wrapper.children().text()).toEqual(text)
  })
})
