import React from 'react'
import { shallow } from 'enzyme'

import ContentCard from '.'

describe('ContentCard', () => {
  it('renders', () => {
    const wrapper = shallow(<ContentCard title='Some title' />)
    expect(wrapper).toBeTruthy()
  })
})
