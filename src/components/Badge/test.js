import React from 'react'
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import Badge from '.'

describe('Badge', () => {
  it('displays text', () => {
    const text = 'Some text'
    const wrapper = shallow(
      <Theme>
        <Badge text={text} />
      </Theme>
    )
    expect(wrapper.html()).toMatch(text)
  })
})
