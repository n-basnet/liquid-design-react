import React from 'react'
import { shallow } from 'enzyme'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { Icon } from '.'

describe('Icon', () => {
  const getWrapper = iconProps => shallow(
    <Icon theme={DEFAULT_THEME} {...iconProps} />
  )
  it('renders', () => {
    expect(getWrapper({
      name: 'close',
    })).toBeTruthy()
  })
  it('handles invalid name', () => {
    const wrapper = getWrapper({
      name: 'this is never going to be an icon name',
    })
    expect(wrapper.text()).toMatch('invalid icon')
    expect(wrapper).toBeTruthy()
  })
})
