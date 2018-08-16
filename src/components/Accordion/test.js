import React from 'react'
import { shallow } from 'enzyme'

import Accordion, { SectionTitle, SectionContent } from '.'
import { placeholderText } from '~/../storybook/helpers'

describe('Accordion', () => {
  const title = 'Section title'
  const content = placeholderText()

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
