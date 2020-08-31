import React from 'react'
import { mount } from 'enzyme'

import Theme from '../Theme'
import { getClassName } from '../components/misc/hoc/attachClassName'

export const everyComponentTestSuite = (getWrapperFn, Component, name) => {
  const getComponentWrapper = props => getWrapperFn(props).find(Component)
  it('has a global prefixed className', () => {
    expect(getComponentWrapper().html()).toMatch(getClassName({ name }))
  })
  it('handles a style prop', () => {
    const style = { opacity: 0.33 }
    expect(getComponentWrapper({ style }).html()).toMatch(
      `opacity: ${style.opacity}`,
    )
  })
  it('passes an arbitratry prop', () => {
    const propName = 'data-test-prop'
    const props = { [propName]: 42 }
    expect(getComponentWrapper(props).html()).toMatch(
      `${propName}="${props[propName]}"`,
    )
  })
}

export const getWrapper = (Component, defaultProps) => (props = {}) =>
  mount(
    <Theme>
      <Component {...defaultProps} {...props} />
    </Theme>,
  )

export function currentEventLoopEnd() {
  return new Promise(resolve => setImmediate(resolve))
}
