import React from 'react'
import { shallow } from 'enzyme'

import Accordion, { SectionTitle, SectionContent } from '.'

describe('Accordion', () => {
  const title = 'Section title'
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  const wrapper = shallow(<Accordion content={content} title={title} />)
  it('renders a title', () => {
    const textNodeChildIndex = 1

    expect(
      wrapper
        .find(SectionTitle)
        .childAt(textNodeChildIndex)
        .text()
    ).toEqual(title)
  })

  it('renders content', () => {
    expect(
      wrapper
        .find(SectionContent)
        .children()
        .text()
    ).toEqual(content)
  })
})
