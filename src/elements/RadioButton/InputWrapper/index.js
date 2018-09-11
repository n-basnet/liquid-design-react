import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'

export default styled.input`
  visibility: hidden;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 24px;
  margin: 0;
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
  `};
  :hover {
      :before {
        ${props =>
    !props.disabled &&
          css`
            border-color: ${props =>
    props.isChecked ? props.theme.colors.primary.dark : props.theme.colors.primary.base};
          `}
      }
    }
  :before {
    position: relative;
    visibility: visible;
    display: block;
    width: 24px;
    height: 24px;
    content: '';
     ${props => css`
       ${cursorValue({ ...props, defaultValue: 'pointer' })};
     `};
    transition: ${props => props.theme.transition};
    border-radius: 100%;
    background: ${props => props.theme.colors.white.base};
    ${props =>
    css`
        border: 2px solid ${props.theme.colors.sensitiveGrey.darker};
      `}
    ${props =>
    !props.disabled &&
      props.isChecked &&
      css`
        border: 7px solid ${props.theme.colors.primary.base};
      `};
    box-sizing: border-box;
`
