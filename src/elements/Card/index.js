import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const CARD_WIDTH = 300
const getCardPadding = cardWidth => cardWidth * 8 / 100

const Card = styled.div`
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
  ${props => props.css && css([props.css])}
  ${props => css`
    border-radius: ${props.theme.borderRadius};
    background-color: ${props.theme.colors.white};
    transition: ${props.theme.transition};
    &:hover {
      box-shadow: ${props.theme.boxShadow};
    };
  `}
  display: inline-block;
  margin: 10px;
  max-width: ${CARD_WIDTH}px;
  min-width: ${CARD_WIDTH * 0.8}px;
  padding: ${getCardPadding(CARD_WIDTH)}px;
`

Card.propTypes = {
  center: PropTypes.bool,
  active: PropTypes.bool,
}

export default Card