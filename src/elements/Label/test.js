import React from 'react'
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import Label from '.'

describe('Label', () => {
  const labelText = 'Label Text'

  it('renders the link text', () => {
    const wrapper = shallow(
      <Theme>
        <Label>{labelText}</Label>
      </Theme>
    )
    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(labelText)
  })
})
