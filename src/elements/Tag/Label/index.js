import styled, { css } from 'styled-components'
import { tagColor } from '~/elements/Tag/TagWrapper'

export const Label = styled.span`
  padding: 0 10px 0 8px;
  font-size: 12px;
  ${props => css`
    color: ${tagColor(props)};
    font-weight: ${props.theme.fontWeight.black};
  `};
`
