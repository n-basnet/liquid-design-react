import styled from 'styled-components'

import { media } from '~/utils/styling'

export default styled.footer`
  padding: 100px;
  background: ${props => props.theme.colors.sensitiveGrey.base};
  ${media.max.phone`
      padding: 25px;
    `};
`
