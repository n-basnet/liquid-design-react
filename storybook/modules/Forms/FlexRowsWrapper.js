import styled, { css } from 'styled-components'

import { media } from '~/utils/styling'
import { MOBILE_BREAKPOINT } from './consts'

const SIDE_OFFSET = 25

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  ${props =>
    !props.nested &&
    css`
      max-width: ${500 + SIDE_OFFSET}px;
      margin-right: -${SIDE_OFFSET}px;
      > * {
        padding-right: ${SIDE_OFFSET}px;
        width: 100%;
        ${media.customMin(MOBILE_BREAKPOINT)`
          width: 50%;
        `};
      }
    `};
`
