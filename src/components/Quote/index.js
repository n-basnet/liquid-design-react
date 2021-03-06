import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { getBackgroundImage } from '../../utils/styling'
import { TypographicQuote } from '../../components/Quote/TypographicQuote'
import attachClassName from '../../components/misc/hoc/attachClassName'
import BlockquoteWrapper from '../../components/Quote/BlockquoteWrapper'

const QuoteWrapper = styled(BlockquoteWrapper)`
  max-width: 300px;
`

export const ImageWrapper = styled.div`
  ${getBackgroundImage};
  max-width: 100%;
  max-height: 100%;
  width: 200px;
  height: 200px;
  margin: 0 auto 10px auto;
  border-radius: 50%;
`

export const AuthorWrapper = styled.div`
  padding: 10px 0;
  font-size: 18px;
  line-height: 1.25;
  text-align: center;
  ${props => css`
    font-weight: ${props.theme.fontWeight.black};
  `};
`

export const PhraseWrapper = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.25;
  text-align: center;
`

export const Quote = ({
  author,
  big,
  imagePath,
  source,
  quotation,
  ...props
}) => (
  <>
    {imagePath ? (
      <QuoteWrapper cite={source} {...props}>
        <ImageWrapper src={imagePath} />
        <AuthorWrapper>{author}</AuthorWrapper>
        <PhraseWrapper>{quotation}</PhraseWrapper>
      </QuoteWrapper>
    ) : (
      <TypographicQuote
        author={author}
        big={big}
        quotation={quotation}
        source={source}
        {...props}
      />
    )}
  </>
)

Quote.propTypes = {
  quotation: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  big: PropTypes.bool,
  /** if provided, will display a differently styled quote */
  imagePath: PropTypes.string,
  /** source of the quote, for the HTML `cite` attribute */
  source: PropTypes.string,
}

Quote.defaultProps = {
  big: false,
  imagePath: null,
  source: '',
}

const { Component } = attachClassName(Quote)

export default Component
