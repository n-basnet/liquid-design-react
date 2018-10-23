import styled, { css } from 'styled-components'

import { bgColorSelector, colorSelector, iconOpacitySelector } from '~/elements/Button/utils'
import { ICON_CLASSNAME } from '~/elements/Icon'
import { cursorValue, ieStyles, safariStyles } from '~/utils/styling'

export const widthSelector = props =>
  props.label ? '93px' : props.size === 'big' ? '50px' : '40px'

export default styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-basis: auto;
  border: none;
  ${props => css`
    min-width: ${widthSelector(props)};
    min-height: ${props.size === 'big' ? '50px' : '40px'};
    padding: ${props.size === 'big' ? '13px 0' : '8px 0px'};
    background-color: ${bgColorSelector(props, props.disabled ? 'lightest' : 'base')};
    border-radius: ${props.theme.borderRadius};
    transition: ${props.theme.transition};
    outline: none;
    ${cursorValue};
    &:hover {
      ${!props.disabled &&
        css`
          background-color: ${bgColorSelector(props, 'dark')};
        `}}
    &:focus {
      ${!props.disabled &&
        css`
          background-color: ${bgColorSelector(props, 'darker')};
        `};
    }
    .${ICON_CLASSNAME} {
      ${safariStyles(`
        margin: 0 auto;
      `)};
      svg {
        fill: ${colorSelector(props)};
        opacity: ${props.disabled ? iconOpacitySelector(props) : 1};
      }
    }
    ${!props.disabled &&
      css`
        cursor: pointer;
      `}
  `};
  ${ieStyles(`
    line-height: 1;
  `)};
  &:focus span,
  &:focus span {
    position: relative;
    top: 0px;
    left: 0px;
  }
`
