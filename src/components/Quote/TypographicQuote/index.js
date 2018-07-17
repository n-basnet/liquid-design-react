import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const QuoteWrapper = styled.blockquote`
  display: inline-block;
  padding: 25px;
  ${props => css`
    width: ${props.big ? '500px' : '385px'};
  `};
`

const PhraseWrapper = styled.p`
  margin: 0;
  font-weight: 900;
  ${props => css`
    font-size: ${props.big ? '32px' : '22px'};
  `};
`

const AuthorWrapper = styled.div`
  padding: 10px 0;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.2px;
  ${props => css`
    color: ${props.theme.colors.primary.base};
  `};
`

export const TypographicQuote = ({ author, big, small, source, quotation }) => (
  <QuoteWrapper big={big} small={small}>
    <PhraseWrapper big={big} small={small}>
      {`»${quotation}«`}
    </PhraseWrapper>
    <AuthorWrapper big={big} small={small}>
      {` – ${author}`}
    </AuthorWrapper>
  </QuoteWrapper>
)

TypographicQuote.propTypes = {
  author: PropTypes.string,
  big: PropTypes.bool,
  small: PropTypes.bool,
  source: PropTypes.string,
  quotation: PropTypes.string,
}
