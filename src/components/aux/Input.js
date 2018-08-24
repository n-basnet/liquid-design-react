import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'

const Input = styled.input`
  background: none;
  padding: 0;
  border: 0;
  font: inherit;
  outline: none;
  &::-ms-clear {
    display: none;
  }
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'text' })};
  `};
  ${props =>
    !props.disabled &&
    css`
      transition: ${props.theme.transition};
      ::placeholder {
        color: ${props.theme.colors.richBlack.lightest};
      }
      &:hover::placeholder {
        color: ${props.theme.colors.primary.base};
      }
      &:focus::placeholder {
        opacity: 0;
      }
    `};
`

export default Input
