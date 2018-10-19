import React from 'react'
import NavigationStateWrapper from './NavigationStateWrapper'
import { mount } from 'enzyme'

describe('NavigationStateWrapper', () => {
  const defaultProps = {
    activeTabIndex: 0,
  }

  const wrapper = mount(
    <NavigationStateWrapper {...defaultProps}>
      {({ activeTabIndex, handleTabClick }) => (
        <div>
          {/* dummy injected component, <p> contains activeTabIndex,
          <button> handles onclick, that updates from index from 0 to 1 */}
          <p>{activeTabIndex}</p>
          <button onClick={() => handleTabClick(1)} />
        </div>
      )}
    </NavigationStateWrapper>
  )

  it('passes proper default activeTabIndex', () => {
    expect(wrapper.find('p').text()).toEqual('0')
  })

  it('changes activeTabIndex to 1, when clicked on dummy button', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.find('p').text()).toEqual('1')
  })
})
