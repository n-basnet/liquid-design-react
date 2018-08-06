import React from 'react'
import { shallow } from 'enzyme'

import Link from '.'
import Icon from '~/elements/Icon'

describe('Link', () => {
  const linkText = 'Label Text'
  const textNodeIndex = 1
  const icon = 'arrowRight'
  const wrapper = shallow(<Link>{linkText}</Link>)

  it('renders the link text', () => {
    expect(wrapper.childAt(textNodeIndex).text()).toEqual(linkText)
  })

  it('renders a correct icon', () => {
    expect(wrapper.find(Icon).prop('name')).toEqual(icon)
  })
})
