import styled from 'styled-components'
import { media } from '~/utils/styling'

export const LineGraphWrapper = styled.section`
  width: ${props => props.chartWidth}px;
  background: ${props => props.theme.colors.white.base};
  overflow: hidden;
  height: ${props => props.chartHeight}px;
  ${media.max.phone`
    width: 100vw;
  `};
`
