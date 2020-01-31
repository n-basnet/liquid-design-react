import Faq from '.'
import Headline from '../../elements/Headline'
import Accordion, { SectionContent } from '../../components/Accordion'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Faq', () => {
  const defaultProps = {
    headlinesTexts: {
      primary: 'Insert Headline',
      secondary: "We've been around for 350 years",
    },
    faqContent: [
      {
        content: 'lorem ipsum dolor sit amet',
        title: 'Section title',
      },
    ],
  }
  const getFaqWrapper = getWrapper(Faq, defaultProps)

  const wrapper = getFaqWrapper()

  it('renders the main headline', () => {
    expect(
      wrapper
        .find(Headline)
        .first()
        .text(),
    ).toBe(defaultProps.headlinesTexts.primary)
  })

  it('renders the secondary headline', () => {
    expect(
      wrapper
        .find(Headline)
        .at(1)
        .text(),
    ).toBe(defaultProps.headlinesTexts.secondary)
  })

  it('renders the accordion section title', () => {
    const faqContentIndex = 0

    expect(wrapper.find(Accordion).prop('title')).toBe(
      defaultProps.faqContent[faqContentIndex].title,
    )
  })

  it('renders the accordion section content', () => {
    const faqContentIndex = 0

    expect(wrapper.find(SectionContent).text()).toBe(
      defaultProps.faqContent[faqContentIndex].content,
    )
  })

  everyComponentTestSuite(getFaqWrapper, Faq, 'Faq')
})
