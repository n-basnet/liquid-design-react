import React from 'react'

import Breadcrumbs from '.'
import SingleBreadcrumb from './SingleBreadcrumb'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Breadcrumbs', () => {
  const getBreadcrumbsWrapper = getWrapper(Breadcrumbs)

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
    const wrapper = getBreadcrumbsWrapper()
    expect(wrapper).toBeTruthy()
  })
  it('renders three items', () => {
    const items = getItems()
    const wrapper = getBreadcrumbsWrapper({ items })
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
    const wrapper = getBreadcrumbsWrapper({ items })
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
    const wrapper = getBreadcrumbsWrapper({ items: [item] })
    expect(wrapper.find(Content)).toBeTruthy()
  })

  everyComponentTestSuite(getBreadcrumbsWrapper, Breadcrumbs, 'Breadcrumbs')
})
