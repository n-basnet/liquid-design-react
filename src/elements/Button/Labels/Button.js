import styled, { css } from 'styled-components'

import { colorSelector, opacitySelector } from '~/elements/Button/utils'

export default styled.div`
  position: relative;
  font-size: 16px;
  letter-spacing: 0.2px;
  ${props => css`
    padding: ${props.icon ? '0 30px 0 8px' : '0 30px'};
    font-weight: ${props.theme.fontWeight.black};
    color: ${colorSelector(props)};
    opacity: ${props.disabled ? opacitySelector(props) : 1};
  `};
`
