import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import attachClassName from '~/components/aux/hoc/attachClassName'

const CARD_WIDTH = 300
const getCardPadding = cardWidth => cardWidth * 8 / 100

const getStackedHoverBoxShadow = theme => `
  6px 8px 4px ${rgba(theme.colors.black.base, 0.05)},
  6px 16px 20px ${rgba(theme.colors.black.base, 0.1)}
`

const getStackedBoxShadow = (theme, hover) => `
  1px 1px 0 0 ${theme.colors.auxGrey.base},
  3px 3px 0 0 ${theme.colors.white.base},
  4px 4px 0 0 ${theme.colors.auxGrey.base},
  6px 6px 0 0 ${theme.colors.white.base}
  ${hover ? `, ${getStackedHoverBoxShadow(theme)}` : ''}
`

const CardWrapper = styled.div`
  display: inline-block;
  margin: 10px;
  padding: ${getCardPadding(CARD_WIDTH)}px;
  max-width: ${CARD_WIDTH}px;
  ${props =>
    props.active &&
    css`
      box-shadow: ${props.theme.doubleBoxShadow};
    `};
  ${props =>
    props.stacked &&
    css`
      box-shadow: ${getStackedBoxShadow(props.theme)};
      &:hover {
        box-shadow: ${getStackedBoxShadow(props.theme, true)};
      }
    `};
  ${props =>
    props.hasCenteredText &&
    css`
      text-align: center;
    `};
  ${props => css`
    border-radius: ${props.theme.borderRadius};
    background-color: ${props.theme.colors.white.base};
    transition: ${props.theme.transition};
  `};
  ${props =>
    !props.active &&
    !props.stacked &&
    css`
      &:hover {
        box-shadow: ${props.theme.boxShadow};
      }
    `};
  ${props => props.css && css([props.css])};
`

export const Card = props => <CardWrapper {...props} />

Card.propTypes = {
  /** with text centering */
  hasCenteredText: PropTypes.bool,
  /** active style - with drop shadow */
  active: PropTypes.bool,
  /** stacked style - suggesting multiple items */
  stacked: PropTypes.bool,
}

Card.defaultProps = {
  hasCenteredText: false,
  active: false,
  stacked: false,
}

const { Component, globalClassName } = attachClassName(Card)

export const CARD_CLASSNAME = globalClassName

export default Component
