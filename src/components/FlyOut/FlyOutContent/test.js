import React from 'react'
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import FlyOutContent from '.'

describe('FlyOutContent', () => {
  it('renders a name and options', () => {
    const contentName = 'Some name'
    const optionName = 'Option 1'
    const options = [{ name: optionName }]
    const wrapper = shallow(
      <Theme>
        <FlyOutContent name={contentName} options={options} />
      </Theme>
    )
    expect(wrapper.html()).toMatch(contentName)
    expect(wrapper.html()).toMatch(optionName)
  })
})
