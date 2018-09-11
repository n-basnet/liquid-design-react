import Accordion, { SectionTitle, SectionContent } from '.'
import { placeholderText } from '~/../storybook/helpers'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Accordion', () => {
  const defaultProps = {
    title: 'Section title',
    children: placeholderText(),
  }

  const getAccordionWrapper = getWrapper(Accordion, defaultProps)

  it('renders a title', () => {
    expect(
      getAccordionWrapper()
        .find(SectionTitle)
        .text()
    ).toEqual(defaultProps.title)
  })

  it('renders children', () => {
    expect(
      getAccordionWrapper()
        .find(SectionContent)
        .text()
    ).toEqual(defaultProps.children)
  })

  everyComponentTestSuite(getAccordionWrapper, Accordion, 'Accordion')
})
