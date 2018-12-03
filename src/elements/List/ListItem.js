import styled, { css } from 'styled-components'

import { ICON_CLASSNAME } from '~/elements/Icon'
import { cursorValue, nonTouchDevicesHoverStyles } from '~/utils/styling'

export const ListItem = styled.li`
  display: flex;
  max-width: 100%;
  min-height: 50px;
  padding: 12px 15px;
  list-style: none;
  font-size: 14px;
  line-height: 1.75;
  :last-child {
    border-radius: 0 0 6px 6px;
    border: none;
  }
  ${props => css`
    border-bottom: 1px solid ${props.theme.colors.sensitiveGrey.darker};
    ${cursorValue}
    ${!props.disabled &&
      props.onClick &&
      nonTouchDevicesHoverStyles(`
      background-color: ${
  props.grey ? props.theme.colors.sensitiveGrey.dark : props.theme.colors.white
};
      color: ${props.theme.colors.primary.base};
      font-weight: ${props.theme.fontWeight.black};
      transition: ${props.theme.transition};
      .${ICON_CLASSNAME} {
        svg {
          fill: ${props.theme.colors.primary.base};
        }
      }
      cursor: pointer;
    `)}
    ${props.active &&
      css`
        font-weight: ${props.theme.fontWeight.black};
        color: ${props.theme.colors.primary.base};
      `};
    ${props.grey &&
      css`
        background-color: ${props.theme.colors.sensitiveGrey.base};
      `};
    ${props.disabled &&
      css`
        span,
        svg {
          opacity: 0.3;
        }
      `};
    .${ICON_CLASSNAME} {
      margin-right: 10px;
      margin-top: 4px;
      min-width: 16px;
      ${props =>
    props.active &&
        css`
          svg {
            fill: ${props.theme.colors.primary.base};
          }
        `};
  `};
`
