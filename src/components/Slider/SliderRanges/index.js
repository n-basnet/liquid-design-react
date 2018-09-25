import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'

const SliderRanges = styled.span`
  font-size: 14px;
  letter-spacing: 0.2px;
  color: ${props => props.theme.colors.richBlack.lightest};
  opacity: ${props => props.disabled && '0.5'};
  label {
    display: inline-block;
    padding-bottom: 5px;
  }
`

export const SliderMin = SliderRanges.extend`
  padding-right: 20px;
`

export const SliderMax = SliderRanges.extend`
  padding-left: 20px;
`

export const SliderButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
  `};
`
