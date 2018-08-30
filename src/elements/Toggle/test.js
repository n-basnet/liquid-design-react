import React from 'react'
import { mount } from 'enzyme'

import Theme from '~/Theme'
import Icon from '~/elements/Icon'
import Toggle from '.'

describe('Toggle', () => {
  const getWrapper = (props = {}) =>
    mount(
      <Theme>
        <Toggle {...props} />
      </Theme>
    )
  it('renders', () => {
    expect(getWrapper()).toBeTruthy()
  })
  it('renders icons', () => {
    const iconNames = ['circleX', 'circleX']
    const wrapper = getWrapper({ icons: iconNames })
    expect(wrapper.find(Icon).length).toEqual(iconNames.length)
  })
  it('handles onClick', () => {
    const onClick = jest.fn()
    const wrapper = getWrapper({ onClick })
    wrapper.find(Toggle).simulate('click')
    expect(onClick).toBeCalled()
  })
})
