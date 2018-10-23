import styled, { css } from 'styled-components'

import { ICON_CLASSNAME } from '~/elements/Icon'

export const ListHead = styled.div`
  display: flex;
  max-width: 100%;
  min-height: 50px;
  padding: 11px 15px;
  border-radius: 6px 6px 0 0;
  font-size: 16px;
  line-height: 1.75;
  ${props => css`
    border-bottom: 1px solid ${props.theme.colors.sensitiveGrey.darker};
    font-weight: ${props.theme.fontWeight.black};
    ${props.grey &&
      css`
        background-color: ${props.theme.colors.sensitiveGrey.base};
      `};
    .${ICON_CLASSNAME} {
      margin-right: 10px;
      margin-top: 6px;
      min-width: 16px;
    }
  `};
`
