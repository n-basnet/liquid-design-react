import React from 'react'
import { shallow } from 'enzyme'
import { path } from 'ramda'

import { Icon, DEFAULT_SIZE } from '.'
import { DEFAULT_THEME } from '~/utils/consts/themes'

describe('Icon', () => {
  const getWrapper = iconProps => shallow(<Icon {...iconProps} />)

  it('renders', () => {
    expect(getWrapper({ name: 'close' })).toBeTruthy()
  })

  it(`sets default size of ${DEFAULT_SIZE}px`, () => {
    const wrapper = getWrapper({ name: 'close' })
    expect(parseInt(wrapper.prop('dimensions').width)).toEqual(DEFAULT_SIZE)
  })

  it('handles click event', () => {
    const onClick = jest.fn()
    const wrapper = getWrapper({ onClick, name: 'close' })
    wrapper.simulate('click')
    expect(onClick).toBeCalled()
  })

  it('handles theme colors', () => {
    ;['black.base', 'richBlue.dark'].map(color => {
      const wrapper = getWrapper({ color, name: 'close' })
      expect(wrapper.prop('svgFill')).toEqual(
        path(color.split('.'), DEFAULT_THEME.colors)
      )
    })
  })

  it('handles custom colors', () => {
    ;['#243cdb', '#33c622'].map(color => {
      const wrapper = getWrapper({ color, name: 'close' })
      expect(wrapper.prop('svgFill')).toEqual(color)
    })
  })

  it('assigns primary color by default', () => {
    const wrapper = getWrapper({ name: 'close' })
    expect(wrapper.prop('svgFill')).toEqual(DEFAULT_THEME.colors.primary.base)
  })

  it('assigns secondary color', () => {
    const wrapper = getWrapper({ name: 'close', secondary: true })
    expect(wrapper.prop('svgFill')).toEqual(DEFAULT_THEME.colors.secondary.base)
  })

  it('handles invalid name', () => {
    const wrapper = getWrapper({
      name: 'this is never going to be an icon name',
    })
    expect(wrapper.text()).toMatch('invalid icon')
    expect(wrapper).toBeTruthy()
  })
})
