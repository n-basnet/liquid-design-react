import styled, { css } from 'styled-components'

import { ICON_CLASSNAME } from '~/elements/Icon'
import { cursorValue } from '~/utils/styling'

export default styled.button`
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  flex-basis: auto;
  padding: 11px 10px;
  border: none;
  outline: none;
  ${props => css`
    flex-direction: ${props.isIconOnRight ? 'row-reverse' : 'row'};
    ${cursorValue};
    &:hover,
    &:active {
      div {
        ${!props.disabled &&
          css`
            font-weight: ${props.theme.fontWeight.black};
            color: ${props.theme.colors.primary.base};
          `};
      }
    }
    ${!props.disabled &&
      css`
        cursor: pointer;
      `};
    .${ICON_CLASSNAME} {
      & svg {
        fill: ${props.disabled
    ? props.theme.colors.sensitiveGrey.darker
    : props.theme.colors.primary.base};
        ${props.isIconOnRight
    ? css`
              margin-left: 0;
            `
    : css`
              margin-right: 5px;
            `};
      }
    }
  `};
  &::-moz-focus-inner {
    border: 0;
  }
`
