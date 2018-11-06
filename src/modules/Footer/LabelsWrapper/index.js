import styled from 'styled-components'

import { media } from '~/utils/styling'

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 25px 0;
  ${media.min.phone`
    padding: 50px 0;
  `};
  ${media.min.desktop`
    flex-direction: row;
    align-items: center;
    flex: 1;
    padding: 0;
  `};
`
