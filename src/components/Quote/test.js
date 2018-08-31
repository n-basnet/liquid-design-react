import React from 'react'
import { shallow } from 'enzyme'

import Quote, { AuthorWrapper, ImageWrapper, PhraseWrapper } from '.'

describe('Quote', () => {
  const author = 'Neville Brody'
  const imagePath = 'https://images.unsplash.com/photo-1521028640727-38d16fc99ba1?w=400&h=400'
  const quotation = 'Digital design is like painting, except the paint never dries ever again.'
  const source = 'http://merck.design'
  const wrapper = shallow(
    <Quote author={author} imagePath={imagePath} source={source} quotation={quotation} />
  )

  it('displays the author', () => {
    expect(
      wrapper
        .find(AuthorWrapper)
        .children()
        .text()
    ).toEqual(author)
  })

  it('displays the quotation text', () => {
    expect(
      wrapper
        .find(PhraseWrapper)
        .children()
        .text()
    ).toEqual(quotation)
  })

  it('displays the correct image', () => {
    expect(wrapper.find(ImageWrapper).prop('src')).toEqual(imagePath)
  })
})
