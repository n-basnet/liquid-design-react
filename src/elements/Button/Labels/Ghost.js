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
    : props.icon
      ? props.theme.colors.richBlack.base
      : props.theme.colors.primary.base};
    &:active {
      ${!props.disabled &&
        css`
          font-weight: ${props.theme.fontWeight.black};
          text-decoration: none;
          color: ${props.icon && props.theme.colors.primary.base};
        `};
    }
  `};
`
