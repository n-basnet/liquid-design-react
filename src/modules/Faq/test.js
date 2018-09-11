import React from 'react'
import { shallow } from 'enzyme'

import Faq from '.'
import Headline from '~/elements/Headline'
import Accordion from '~/components/Accordion'

describe('Faq', () => {
  const headlinesTexts = {
    primary: 'Insert Headline',
    secondary: "We've been around for 350 years",
  }
  const faqContent = [
    {
      content: 'lorem ipsum dolor sit amet',
      title: 'Section title',
    },
  ]
  const wrapper = shallow(<Faq faqContent={faqContent} headlinesTexts={headlinesTexts} />)

  it('renders the main headline', () => {
    const headlineNodeIndex = 0

    expect(
      wrapper
        .find('section')
        .childAt(headlineNodeIndex)
        .find(Headline)
        .children()
        .text()
    ).toBe(headlinesTexts.primary)
  })

  it('renders the secondary headline', () => {
    const headlineNodeIndex = 1

    expect(
      wrapper
        .childAt(headlineNodeIndex)
        .find(Headline)
        .children()
        .text()
    ).toBe(headlinesTexts.secondary)
  })

  it('renders the accordion section title', () => {
    const faqContentIndex = 0

    expect(wrapper.find(Accordion).prop('title')).toBe(faqContent[faqContentIndex].title)
  })

  it('renders the accordion section content', () => {
    const faqContentIndex = 0

    expect(
      wrapper
        .find(Accordion)
        .children()
        .text()
    ).toBe(faqContent[faqContentIndex].content)
  })
})
