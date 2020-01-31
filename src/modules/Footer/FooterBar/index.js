import styled from 'styled-components'

import { media } from '../../../utils/styling'

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 32px;
  ${media.min.desktop`
    flex-direction: row;
    align-items: center;
  `};
`
