import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'

const tagBackground = ({ disabled, theme: { colors }, outline }) => {
  if (disabled) {
    return outline ? colors.white.base : colors.sensitiveGrey.darker
  } else {
    return outline ? colors.white.base : colors.primary.base
  }
}

export const tagColor = ({ outline, disabled, theme: { colors } }) => {
  if (outline) {
    return disabled ? colors.sensitiveGrey.darker : colors.primary.base
  } else return colors.white.base
}

export const TagWrapper = styled.div`
  display: inline-block;
  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 24px;
    border-radius: 12px;
    ${cursorValue};
    ${props => css`
      background-color: ${tagBackground(props)};
      transition: ${props.theme.transition};
      ${props.outline &&
        css`
          border: 2px solid
            ${!props.disabled
    ? props.theme.colors.primary.base
    : props.theme.colors.sensitiveGrey.darker};
          &:hover {
            border-color: ${!props.disabled && props.theme.colors.primary.dark};
          }
        `};
      ${!props.outline &&
        css`
          border: none;
        `};
      &:hover {
        ${!props.outline &&
          css`
            background-color: ${!props.disabled && props.theme.colors.primary.dark};
            color: ${props.theme.colors.primary.dark};
          `};
        ${!props.disabled &&
          props.outline &&
          css`
            span {
              ${props => css`
                color: ${props.theme.colors.primary.dark};
              `};
            }
            svg {
              fill: ${props.theme.colors.primary.dark};
            }
          `};
      }
      svg {
        fill: ${tagColor(props)};
        ${!props.disabled &&
          css`
            cursor: pointer;
          `};
      }
    `};
  }
`
