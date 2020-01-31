import styled, { css } from 'styled-components'

import { colorSelector, opacitySelector } from '../../../elements/Button/utils'
import { safariStyles } from '../../../utils/styling'

export default styled.div`
  position: relative;
  font-size: 16px;
  letter-spacing: 0.2px;
  ${props => css`
    padding: ${props.hasIcon ? '0 30px 0 8px' : '0 30px'};
    font-weight: ${props.theme.fontWeight.black};
    color: ${colorSelector(props)};
    opacity: ${props.disabled ? opacitySelector(props) : 1};
    ${safariStyles(`
      align-self: center;
    `)};
  `};
`
