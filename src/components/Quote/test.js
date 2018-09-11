import Quote, { AuthorWrapper, ImageWrapper, PhraseWrapper } from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Quote', () => {
  const defaultProps = {
    author: 'Neville Brody',
    imagePath: 'https://images.unsplash.com/photo-1521028640727-38d16fc99ba1?w=400&h=400',
    quotation: 'Digital design is like painting, except the paint never dries ever again.',
    source: 'http://merck.design',
  }
  const getQuoteWrapper = getWrapper(Quote, defaultProps)

  it('displays the author', () => {
    expect(
      getQuoteWrapper()
        .find(AuthorWrapper)
        .text()
    ).toEqual(defaultProps.author)
  })

  it('displays the quotation text', () => {
    expect(
      getQuoteWrapper()
        .find(PhraseWrapper)
        .text()
    ).toEqual(defaultProps.quotation)
  })

  it('displays the correct image', () => {
    expect(
      getQuoteWrapper()
        .find(ImageWrapper)
        .prop('src')
    ).toEqual(defaultProps.imagePath)
  })

  everyComponentTestSuite(getQuoteWrapper, Quote, 'Quote')
})
