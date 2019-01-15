import styled, { css } from 'styled-components'

import { ICON_CLASSNAME } from '~/elements/Icon'
import { INPUT_CLASSNAME } from '~/components/misc/Input'
import { media } from '~/utils/styling'

const getIconColorStyles = props => css`
  .${ICON_CLASSNAME} svg {
    fill: ${props.theme.colors.primary.base};
  }
`

const getBackgroundColor = (ghost, color) =>
  !ghost &&
  css`
    background-color: ${color};
  `

export default styled.form`
  position: relative;
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  ${media.max.phone`
    font-size: 16px;
  `};
  .${ICON_CLASSNAME} {
    position: absolute;
    left: 12px;
    top: 11px;
    ${media.max.phone`
      top: 16px;
    `};
  }
  .${INPUT_CLASSNAME} {
    ${props =>
    props.disabled &&
      css`
        opacity: 1;
      `};
    ${props =>
    props.hasResults &&
      css`
        overflow: visible;
        &:after {
          border-radius: 0;
        }
      `};
    input {
      min-width: 250px;
      padding: 12px 9px 9px 44px;
      transform: translateY(-2px);
      ${media.max.phone`
        padding: 16px 9px 12px 44px;
      `};
      ${props =>
    !props.disabled &&
        css`
          &:hover::placeholder {
            color: ${props.theme.colors.primary.base};
          }
        `};
    }
  }
  ${props => css`
    ${getBackgroundColor(props.ghost, props.theme.colors.sensitiveGrey.base)};
    transition: ${props.theme.transition};
    .${ICON_CLASSNAME} svg {
      transition: ${props.theme.transition};
      fill: ${props.theme.colors.sensitiveGrey.darker};
    };
    ${
  props.hasResults || props.ghost
    ? css`
            border-top-left-radius: ${props.theme.borderRadius};
            border-top-right-radius: ${props.theme.borderRadius};
          `
    : css`
            overflow: hidden;
            border-radius: ${props.theme.borderRadius};
          `
};
    ${
  props.disabled
    ? css`
            opacity: 0.5;
          `
    : props.focused
      ? css`
            ${!props.ghost &&
              css`
                box-shadow: ${props.theme.boxShadow};
              `};
            ${getIconColorStyles};
          `
      : css`
            &:hover {
              ${getBackgroundColor(props.ghost, props.theme.colors.sensitiveGrey.dark)};
              ${getIconColorStyles};
            }
          `
};
        };
  `};
`
