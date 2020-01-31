import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import BlockquoteWrapper from '../../../components/Quote/BlockquoteWrapper'

const QuoteWrapper = styled(BlockquoteWrapper)`
  ${props => css`
    max-width: ${props.big ? '500px' : '385px'};
  `};
`

const PhraseWrapper = styled.p`
  margin: 0;
  line-height: 1.25;
  ${props => css`
    font-size: ${props.big ? '32px' : '22px'};
    font-weight: ${props.theme.fontWeight.black};
  `};
`

const AuthorWrapper = styled.div`
  padding: 10px 0 10px 3px;
  font-size: 12px;
  letter-spacing: 0.2px;
  ${props => css`
    font-weight: ${props.theme.fontWeight.regular};
    color: ${props.theme.colors.primary.base};
  `};
`

export const TypographicQuote = ({
  source,
  author,
  big,
  quotation,
  ...props
}) => (
  <QuoteWrapper big={big} cite={source} {...props}>
    <PhraseWrapper big={big}>{`»${quotation}«`}</PhraseWrapper>
    <AuthorWrapper big={big}>{`– ${author}`}</AuthorWrapper>
  </QuoteWrapper>
)

TypographicQuote.propTypes = {
  quotation: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  big: PropTypes.bool,
  source: PropTypes.string,
}

TypographicQuote.defaultProps = {
  big: false,
  source: '',
}
