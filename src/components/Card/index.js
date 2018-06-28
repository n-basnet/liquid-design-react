import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'

const CARD_WIDTH = 300
const getCardPadding = cardWidth => cardWidth * 8 / 100

export const Card = styled.div`
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
  max-width: ${CARD_WIDTH}px;
  padding: ${getCardPadding(CARD_WIDTH)}px;
`

Card.defaultProps = {
  theme: DEFAULT_THEME,
}

Card.propTypes = {
  center: PropTypes.bool,
  active: PropTypes.bool,
}
