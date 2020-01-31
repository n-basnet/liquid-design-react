import styled from 'styled-components'

import { media } from '../../../utils/styling'

export default styled.div`
  height: 1px;
  margin-top: 117px;
  background: ${props => props.theme.colors.sensitiveGrey.darkest};
  ${media.max.tablet`
      margin-top: 80px;
      margin-bottom: 40px;
    `};
  ${media.max.phone`
      margin-top: 40px;
      margin-bottom: 10px;
    `};
`
