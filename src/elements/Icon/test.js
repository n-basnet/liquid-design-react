import React from 'react'
import { shallow } from 'enzyme'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { Icon, DEFAULT_SIZE } from '.'

describe('Icon', () => {
  const getWrapper = iconProps =>
    shallow(<Icon theme={DEFAULT_THEME} {...iconProps} />)

  it('renders', () => {
    expect(getWrapper({ name: 'close' })).toBeTruthy()
  })

  it(`sets default size of ${DEFAULT_SIZE}px`, () => {
    const wrapper = getWrapper({ name: 'close' })
    expect(parseInt(wrapper.prop('dimensions').width)).toEqual(DEFAULT_SIZE)
  })

  it('handles invalid name', () => {
    const wrapper = getWrapper({
      name: 'this is never going to be an icon name',
    })
    expect(wrapper.text()).toMatch('invalid icon')
    expect(wrapper).toBeTruthy()
  })
})
