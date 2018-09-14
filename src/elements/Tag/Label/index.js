import styled, { css } from 'styled-components'
import { tagColor } from '~/elements/Tag/TagWrapper'

export const Label = styled.span`
  max-width: calc(100% - 29px);
  padding-left: 2px;
  font-size: 12px;
  ${props => css`
    color: ${tagColor(props)};
    font-weight: ${props.theme.fontWeight.black};
  `};
`
