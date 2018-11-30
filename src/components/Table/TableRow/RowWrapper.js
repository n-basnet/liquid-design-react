import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import { AUX_CELL_CLASSNAME, getTableCellYPadding } from '~/components/Table/utils'
import { cursorValue } from '~/utils/styling'

const RowWrapper = styled.tr`
  ${props => css`
    border-bottom: 1px solid
      ${rgba(props.theme.colors.sensitiveGrey.darker, props.disabled ? 0.5 : 1)};
    transition: ${props.theme.transition};
    ${props.isInfoCell &&
      css`
        background-color: ${props.theme.colors.sensitiveGrey.base};
      `};
    ${props.disabled
    ? css`
          opacity: 0.5;
        `
    : css`
          &:hover {
            background-color: ${props.theme.colors.sensitiveGrey.base};
          }
        `};
    ${cursorValue({ ...props, defaultValue: props.onClick && 'pointer' })};
    ${props.isExpanded &&
      css`
        &,
        &:hover {
          background-color: ${props.theme.colors.sensitiveGrey.dark};
        }
      `};
    .${AUX_CELL_CLASSNAME} {
      padding-top: ${getTableCellYPadding(props.size)};
    }
  `};
`

export default RowWrapper
