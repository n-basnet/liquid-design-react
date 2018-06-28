import React from 'react'
import { shallow } from 'enzyme'

import { Card } from '.'

describe('Card', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Card />
    )
    expect(wrapper).toBeTruthy()
  })
})
