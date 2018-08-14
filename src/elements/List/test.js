import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

import List from '.'

const items = ['item 1', 'item 2', 'item 3']

describe('List', () => {
  const onClickMock = jest.fn()
  const activeIndex = 1
  const disabledIndex = 3
  const wrapper = shallow(
    <List
      activeItemIndex={activeIndex - 1}
      disabledItemIndex={disabledIndex - 1}
      grey
      icon='star'
      items={items}
      onClick={onClickMock}
    />
  )

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders an unordered list', () => {
    expect(wrapper.type()).toEqual('ul')
  })

  it('renders a ListItem text correctly', () => {
    expect(
      wrapper
        .childAt(1)
        .find('span')
        .text()
    ).toEqual(items[0])
  })

  it('renders a first ListItem active', () => {
    expect(wrapper.childAt(activeIndex).prop('active')).toBe(true)
  })

  it('renders a second ListItem disabled', () => {
    expect(wrapper.childAt(disabledIndex).prop('disabled')).toBe(true)
  })

  it('calls a function when clicked', () => {
    wrapper.childAt(2).simulate('click')
    expect(onClickMock).toBeCalled()
  })
})
