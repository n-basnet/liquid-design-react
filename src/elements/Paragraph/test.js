import React from 'react'
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import Paragraph from '.'

describe('Paragraph', () => {
  const paragraphText = 'Lorem ipsum dolor sit amet'

  it('renders the paragraph text', () => {
    const wrapper = shallow(
      <Theme>
        <Paragraph>{paragraphText}</Paragraph>
      </Theme>
    )
    expect(
      wrapper
        .find(Paragraph)
        .children()
        .text()
    ).toEqual(paragraphText)
  })
})
