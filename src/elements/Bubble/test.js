import React from 'react'
import { shallow } from 'enzyme'

import Bubble from '.'

describe('Bubble', () => {
  it('renders', () => {
    const wrapper = shallow(<Bubble />)
    expect(wrapper).toBeTruthy()
  })
})
