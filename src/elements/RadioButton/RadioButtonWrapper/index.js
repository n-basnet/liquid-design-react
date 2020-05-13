import styled, { css } from 'styled-components'

import { cursorValue, safariStyles } from '../../../utils/styling'

// additional :before on RadioButtonWrapper is required for the Firefox and Edge,
// which do not currently support :before for input fields

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
              props.isSelected
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
        props.isSelected &&
        css`
          border: 7px solid ${props.theme.colors.primary.base};
        `};
      ${props =>
        props.disabled &&
        props.isSelected &&
        css`
          border: 7px solid ${props.theme.colors.primary.base};
          z-index: 1;
        `};
      box-sizing: border-box;
      outline: none;
      }
    }
    ${safariStyles(`
      :before {
        display: none;
      }
    `)}

`
