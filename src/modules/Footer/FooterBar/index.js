import styled from 'styled-components'

import { media } from '~/utils/styling'

export default styled.div`
  display: flex;
  align-items: center;
  padding-top: 32px;
  ${media.max.tablet`
      flex-direction: column
      align-items: flex-start;
    `};
`
