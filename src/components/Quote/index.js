import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { getBackgroundImage } from '~/utils/styling'
import { TypographicQuote } from '~/components/Quote/TypographicQuote'

const QuoteWrapper = styled.blockquote`
  display: inline-block;
  width: 300px;
  padding: 25px;
`

export const ImageWrapper = styled.div`
  ${getBackgroundImage};
  max-width: 200px;
  min-height: 200px;
  margin: 0 auto 10px auto;
  border-radius: 50%;
`

export const AuthorWrapper = styled.div`
  padding: 10px 0;
  font-size: 18px;
  font-weight: 900;
  text-align: center;
  ${props => css`
    color: ${props.theme.colors.richBlack};
  `};
`

export const PhraseWrapper = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
`

const Quote = ({ author, big, imagePath, small, source, quotation }) =>
  imagePath ? (
    <QuoteWrapper cite={source}>
      <ImageWrapper src={imagePath} />
      <AuthorWrapper>{author}</AuthorWrapper>
      <PhraseWrapper>{quotation}</PhraseWrapper>
    </QuoteWrapper>
  ) : (
    <TypographicQuote
      author={author}
      big={big}
      small={small}
      source={source}
      quotation={quotation}
    />
  )

Quote.propTypes = {
  author: PropTypes.string,
  big: PropTypes.bool,
  imagePath: PropTypes.string,
  small: PropTypes.bool,
  source: PropTypes.string,
  quotation: PropTypes.string,
}

export default Quote
