import React from 'react'
import { shallow } from 'enzyme'

import Breadcrumbs from '.'
import SingleBreadcrumb from './SingleBreadcrumb'

describe('Breadcrumbs', () => {
  const getItems = (modifier = {}) => [
    {
      name: 'Breadcrumb 1',
    },
    {
      name: 'Breadcrumb 2',
      ...modifier,
    },
    {
      name: 'Breadcrumb 3',
    },
  ]
  it('renders without items', () => {
    const wrapper = shallow(
      <Breadcrumbs />
    )
    expect(wrapper).toBeTruthy()
  })
  it('renders three items', () => {
    const items = getItems()
    const wrapper = shallow(
      <Breadcrumbs items={items} />
    )
    expect(wrapper.find(SingleBreadcrumb).length).toEqual(items.length)
  })
  it('handles clicking on an item', () => {
    const initNum = 0
    let num = initNum
    const items = getItems({
      onClick: () => { num = num + 1 },
    })
    const wrapper = shallow(
      <Breadcrumbs items={items} />
    )
    expect(num).toEqual(initNum)
    wrapper.find(SingleBreadcrumb).at(1).simulate('click')
    expect(num).toEqual(initNum + 1)
  })
})
