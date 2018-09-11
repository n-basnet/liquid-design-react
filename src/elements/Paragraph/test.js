import Paragraph from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Paragraph', () => {
  const defaultProps = {
    children: 'Lorem ipsum dolor sit amet',
  }
  const getParagraphWrapper = getWrapper(Paragraph, defaultProps)

  it('renders the paragraph content', () => {
    const wrapper = getParagraphWrapper()
    expect(wrapper.find(Paragraph).text()).toEqual(defaultProps.children)
  })

  everyComponentTestSuite(getParagraphWrapper, Paragraph, 'Paragraph')
})
