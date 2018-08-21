import React from 'react'
import { mount } from 'enzyme'

import Favorite, { ANIMATION_DURATION } from '.'

jest.useFakeTimers()

describe('Favorite', () => {
  it('handles click', () => {
    const wrapper = mount(<Favorite />)
    expect(wrapper.state('isAnimating')).toEqual(false)

    wrapper.simulate('click')

    expect(wrapper.state('isAnimating')).toEqual(true)

    setTimeout(() => {
      expect(wrapper.state('isAnimating')).toEqual(false)
      expect(wrapper.state('isActive')).toEqual(true)
    }, ANIMATION_DURATION)

    jest.runAllTimers()
  })
})
