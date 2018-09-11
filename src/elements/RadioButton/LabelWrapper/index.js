import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'

// supports (-webkit-marquee-repetition: infinite) and (object-fit: fill) - Safari selector

export default styled.label`
  display: inline-block;
  position: relative;
  padding-left: 30px;
  font-size: 14px;
  line-height: 1.75;
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
  `};
  @supports (-webkit-marquee-repetition: infinite) and (object-fit: fill) {
    top: 1px;
  }
`
