import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { media } from '~/utils/styling'

const CARD_WIDTH = 300
const getCardPadding = cardWidth => cardWidth * 8 / 100

const Card = styled.div`
  display: inline-block;
  margin: 10px;
  padding: ${getCardPadding(CARD_WIDTH)}px;
  max-width: ${CARD_WIDTH}px;
  ${media.min.phone`
    width: ${CARD_WIDTH}px;
  `}
  ${props => props.active && css`
    box-shadow: ${props.theme.doubleBoxShadow};
  `}
  ${props => props.stacked && css`
    box-shadow:
      1px 1px 0 0 ${props.theme.colors.grey},
      3px 3px 0 0 ${props.theme.colors.white},
      4px 4px 0 0 ${props.theme.colors.grey},
      6px 6px 0 0 ${props.theme.colors.white}
  `};
  ${props => props.center && css`
    text-align: center;
  `}
  ${props => css`
    border-radius: ${props.theme.borderRadius};
    background-color: ${props.theme.colors.white};
    transition: ${props.theme.transition};
    &:hover {
      box-shadow: ${props.theme.boxShadow};
    };
  `}
  ${props => props.css && css([props.css])}
`

Card.propTypes = {
  center: PropTypes.bool,
  active: PropTypes.bool,
  stacked: PropTypes.bool,
}

export default Card
