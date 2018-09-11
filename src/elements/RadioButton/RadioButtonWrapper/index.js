import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'

/*
additional :before on RadioButtonWrapper is required for the Firefox and Edge, which do not currently support :before for input fields
also, @supports (-webkit-marquee-repetition:infinite) and (object-fit:fill) is meant to avoid displaying :before twice on Safari
-webkit-tap-highlight-color: rgba(255, 255, 255, 0); prevents blue highlight while clicking on mobile devices
*/

export default styled.div`
  display: inline-block;
  position: relative;
  margin: 0 10px 10px 0;
  opacity: ${props => props.disabled && '0.3'};
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
  `};
  :hover {
      :before {
        ${props =>
    !props.disabled &&
          css`
            border-color: ${props =>
    props.isChecked
      ? props.theme.colors.primary.dark
      : props.theme.colors.primary.base};
          `}
      }
  }

  :before {
      position: absolute;
      display: inline-block;
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
      outline: none;
      }
    }
  @supports (-webkit-marquee-repetition:infinite) and (object-fit:fill) {
    :before {
        display: none;
    }
  }

`
