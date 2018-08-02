import React from 'react'
import { shallow } from 'enzyme'

import Headline from '.'
import { XH1 } from './H'

describe('Headline', () => {
  const text = 'Headline'
  const size = 'XH1'
  const wrapper = shallow(<Headline size={size}>{text}</Headline>)
  it('renders the Headline text', () => {
    expect(
      wrapper
        .find(XH1)
        .children()
        .text()
    ).toEqual(text)
  })
})
