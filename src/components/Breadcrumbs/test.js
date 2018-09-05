import React from 'react'
import { mount } from 'enzyme'

import Theme from '~/Theme'
import Breadcrumbs from '.'
import SingleBreadcrumb from './SingleBreadcrumb'

describe('Breadcrumbs', () => {
  const getWrapper = (props = {}) =>
    mount(
      <Theme>
        <Breadcrumbs {...props} />
      </Theme>
    )
  const getItems = (modifier = {}) => [
    {
      content: 'Breadcrumb 1',
    },
    {
      content: 'Breadcrumb 2',
      ...modifier,
    },
    {
      content: 'Breadcrumb 3',
    },
  ]
  it('renders without items', () => {
    const wrapper = getWrapper()
    expect(wrapper).toBeTruthy()
  })
  it('renders three items', () => {
    const items = getItems()
    const wrapper = getWrapper({ items })
    expect(wrapper.find(SingleBreadcrumb).length).toEqual(items.length)
  })
  it('handles clicking on an item', () => {
    const initNum = 0
    let num = initNum
    const items = getItems({
      onClick: () => {
        num = num + 1
      },
    })
    const wrapper = getWrapper({ items })
    expect(num).toEqual(initNum)
    wrapper
      .find(SingleBreadcrumb)
      .at(1)
      .simulate('click')
    expect(num).toEqual(initNum + 1)
  })
  it('handles a node as item content', () => {
    const Content = () => <div>link</div>
    const item = { content: <Content /> }
    const wrapper = getWrapper({ items: [item] })
    expect(wrapper.find(Content)).toBeTruthy()
  })
})
