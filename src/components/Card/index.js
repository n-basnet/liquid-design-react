import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'

export const Card = styled.div`
  ${props => props.active && css`
    box-shadow: ${props.theme.doubleBoxShadow};
  `}
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
  max-width: 330px;
  padding: 20px;
`

Card.defaultProps = {
  theme: DEFAULT_THEME,
}

Card.propTypes = {
  center: PropTypes.bool,
  active: PropTypes.bool,
}
