import React from 'react'
import { mount } from 'enzyme'

import Theme from '.'

describe('Theme', () => {
  it('renders', () => {
    const wrapper = mount(
      <Theme themeName='richPurple'>
        <div>hello</div>
      </Theme>
    )
    expect(wrapper).toBeTruthy()
  })
})
