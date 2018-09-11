import React from 'react'
import { shallow } from 'enzyme'

import Header from '.'
import LabelsWrapper from './LabelsWrapper'

describe('Header', () => {
  const labelOne = 'Room 01'
  const labelOneIndex = 0

  const labelTwo = 'Room 02'
  const labelTwoIndex = 1

  it('renders the text correctly', () => {
    const wrapper = shallow(
      <Header withText labelOne={labelOne} labelTwo={labelTwo} />
    )
    expect(
      wrapper
        .find(LabelsWrapper)
        .childAt(labelOneIndex)
        .children()
        .text()
    ).toBe(labelOne)

    expect(
      wrapper
        .find(LabelsWrapper)
        .childAt(labelTwoIndex)
        .children()
        .text()
    ).toBe(labelTwo)
  })
})
