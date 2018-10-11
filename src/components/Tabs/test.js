import React from 'react'
import { mount, shallow } from 'enzyme'

import Tabs from '.'
import TabHead from '~/components/Tabs/TabHead'
import TabContent from '~/components/Tabs/TabContent'
import Theme from '~/Theme'

describe('Tabs', () => {
  const content = [
    {
      id: 1,
      name: 'Tab Head 1',
      content: 'Tab Content 1',
    },
    {
      id: 2,
      name: 'Tab Head 2',
      content: 'Tab Head 2',
    },
  ]

  const wrapper = mount(
    <Theme>
      <Tabs tabsData={content} />
    </Theme>
  )

  it('renders 2 tab heads', () => {
    expect(wrapper.find(TabHead).length).toBe(2)
  })

  it('renders 2 tab contents', () => {
    expect(wrapper.find(TabContent).length).toBe(2)
  })

  it('renders a tab head text correctly', () => {
    expect(
      wrapper
        .find(TabHead)
        .first()
        .text()
    ).toEqual(content[0]['name'])
  })

  it('renders a tab content text correctly', () => {
    expect(
      wrapper
        .find(TabContent)
        .first()
        .text()
    ).toEqual(content[0]['content'])
  })

  it('has an initial state "selectedTabId" equal to 0', () => {
    const TabsWrapper = shallow(<Tabs tabsData={content} />)
    expect(TabsWrapper.state().selectedTabId).toBe(0)
  })
})
