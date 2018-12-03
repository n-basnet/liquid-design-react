import styled, { css } from 'styled-components'

import { cursorValue, nonTouchDevicesHoverStyles } from '~/utils/styling'
import { ICON_CLASSNAME } from '~/elements/Icon'

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
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  min-width: 100px;
  max-width: 100%;
  padding: 2px 0;
  border-radius: 16px;
  ${cursorValue};
  ${props => css`
    background-color: ${tagBackground(props)};
    transition: ${props.theme.transition};
    border: 2px solid
      ${
  !props.disabled ? props.theme.colors.primary.base : props.theme.colors.sensitiveGrey.darker
};
    ${!props.disabled &&
      nonTouchDevicesHoverStyles(`
      border-color: ${props.theme.colors.primary.dark};
      ${
  props.outline
    ? `
          span {
            color: ${props.theme.colors.primary.dark};
          }
          .${ICON_CLASSNAME} svg {
            fill: ${props.theme.colors.primary.dark};
          }
        `
    : `
        background-color: ${!props.disabled && props.theme.colors.primary.dark};
        color: ${props.theme.colors.primary.dark};
      `
};

    `)}
    .${ICON_CLASSNAME} svg {
      fill: ${tagColor(props)};
      ${!props.disabled &&
        css`
          cursor: pointer;
        `};
    }
  `};
`
