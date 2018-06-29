import React from 'react'
import { shallow } from 'enzyme'

import Ratings from '.'

describe('Ratings', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Ratings />
    )
    expect(wrapper).toBeTruthy()
  })
})
