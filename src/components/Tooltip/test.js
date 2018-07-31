import React from 'react'
import { mount } from 'enzyme'

import Theme from '~/Theme'
import { ICON_CLASSNAME } from '~/elements/Icon'
import Tooltip from '.'
import { getArrowStyle, getPosition } from './utils'
import { WALLS_KEYS, SIDES_KEYS } from './consts'

describe('Tooltip', () => {
  it('displays and hides content on click', () => {
    const tooltipContent = 'some content'
    const wrapper = mount(
      <Theme>
        <Tooltip>{tooltipContent}</Tooltip>
      </Theme>
    )

    const TooltipIcon = wrapper.find(`.${ICON_CLASSNAME}`).first()
    const getFirstDivText = () =>
      wrapper
        .find('div')
        .first()
        .text()
    expect(getFirstDivText()).toEqual('')
    TooltipIcon.simulate('click')
    expect(getFirstDivText()).toEqual(tooltipContent)
    TooltipIcon.simulate('click')
    expect(getFirstDivText()).toEqual('')
  })

  it('utils - getArrowStyle', () => {
    WALLS_KEYS.map(wall =>
      SIDES_KEYS.map(side => {
        expect(getArrowStyle({ color: 'white', wall, side })).toMatchSnapshot()
      })
    )
  })

  it('utils - getPosition', () => {
    WALLS_KEYS.map(wall =>
      SIDES_KEYS.map(side => {
        expect(getPosition({ wall, side })).toMatchSnapshot()
      })
    )
  })
})
