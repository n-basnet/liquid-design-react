import styled, { css } from 'styled-components'

export default styled.div`
  position: relative;
  margin: 0 5px;
  padding-bottom: 1px;
  letter-spacing: 0.2px;
  ${props => css`
    font-size: ${props.size === 'small' ? '14px' : '16px'};
    font-weight: ${props.theme.fontWeight.bold};
    color: ${props.disabled
    ? props.theme.colors.sensitiveGrey.darker
    : props.theme.colors[props.hasIcon ? 'richBlack' : 'primary'].base};
  `};
`
