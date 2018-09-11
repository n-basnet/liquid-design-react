import styled, { css } from 'styled-components'

export default styled.section`
  display: flex;
  align-items: center;
  min-height: 60px;
  ${props => css`
    background-color: ${props.theme.colors.primary.base};
  `};
`
