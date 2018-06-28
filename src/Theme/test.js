import React from 'react'
import { shallow } from 'enzyme'

import Theme from '.'

describe('Theme', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Theme themeName='richPurple'>
        <div>hello</div>
      </Theme>
    )
    expect(wrapper).toBeTruthy()
  })
})
