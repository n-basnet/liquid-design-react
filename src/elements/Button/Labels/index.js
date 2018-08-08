import styled, { css } from 'styled-components'

import { colorSelector, opacitySelector } from '~/elements/Button/utils'

export const Label = styled.div`
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

export const GhostLabel = styled.div`
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
      ? props.theme.colors.richBlack
      : props.theme.colors.primary.base};
    &:active {
      ${!props.disabled &&
        css`
          font-weight: 900;
          text-decoration: none;
          color: ${props.icon && props.theme.colors.primary.base};
        `};
    }
  `};
`
