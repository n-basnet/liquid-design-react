import React from 'react'
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import FlyOut from '.'

describe('FlyOut', () => {
  it('renders a label', () => {
    const label = 'Some label'
    const wrapper = shallow(
      <Theme>
        <FlyOut label={label} />
      </Theme>
    )
    expect(wrapper.html()).toMatch(label)
  })
})
