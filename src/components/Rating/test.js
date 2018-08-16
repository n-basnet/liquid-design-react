import React from 'react'
import { shallow } from 'enzyme'

import Rating, { roundToNearest } from '.'

describe('Rating', () => {
  it('renders', () => {
    const wrapper = shallow(<Rating />)
    expect(wrapper).toBeTruthy()
  })
})

it('roundToNearest', () => {
  ;[
    { input: 1.3, output: 1.5 },
    { input: 2.5, output: 2.5 },
    { input: 3.51, output: 4 },
    { input: 3.91, output: 4 },
  ].map(item => {
    expect(roundToNearest(item.input)).toEqual(item.output)
  })
})
