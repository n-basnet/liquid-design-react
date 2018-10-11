import styled, { css } from 'styled-components'

export default styled.div`
  max-width: 100%;
  ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `};
  overflow-x: scroll;
  overflow-y: hidden;
`
