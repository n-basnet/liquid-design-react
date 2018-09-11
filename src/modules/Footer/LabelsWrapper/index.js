import styled from 'styled-components'

import { media } from '~/utils/styling'

export default styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  ${media.max.tablet`
  flex-direction: column;
      padding: 50px 0;
    `};
  ${media.max.phone`
  flex-direction: column;
      padding: 25px 0;
    `};
`
