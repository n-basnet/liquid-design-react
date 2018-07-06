import React from 'react'
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import Card from '.'

describe('Card', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Theme>
        <Card />
      </Theme>
    )
    expect(wrapper).toBeTruthy()
  })
})
