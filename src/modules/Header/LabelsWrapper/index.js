import styled from 'styled-components'
import { media } from '~/utils/styling'

export default styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  div {
    color: ${props => props.theme.colors.white.base};
    ${media.max.phone`
      font-size: 12px;
      line-height: 1.25;
      letter-spacing: 0.2px;
    `};
  }
  div:first-child {
    font-weight: ${props => props.theme.fontWeight.bold};
  }
  ${media.max.phone`
    padding: 0 10px 0 10px;
  `};
`
