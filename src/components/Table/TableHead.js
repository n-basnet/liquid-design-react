import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { SORT_MODES, SIZES, CELL_MIN_WIDTH } from '~/components/Table/utils'
import { ArrowIcon } from '~/components/Table/tableIcons'
import { ICON_CLASSNAME } from '~/elements/Icon'

export const TableHead = styled.thead`
  text-align: left;
  ${props => css`
    th {
      background-color: ${props.theme.colors.sensitiveGrey.base};
      &:first-child {
        border-top-left-radius: ${props.theme.borderRadius};
      }
      &:last-child {
        border-top-right-radius: ${props.theme.borderRadius};
      }
    }
  `};
`

const getPadding = size =>
  ({
    [SIZES.small]: '4px 24px 8px',
    [SIZES.medium]: '12px 24px 15px',
    [SIZES.large]: '12px 24px 15px',
  }[size])

const TableHeadCellWrapper = styled.th`
  > div {
    display: flex;
    align-items: center;
    min-width: ${CELL_MIN_WIDTH};
  }
  ${props => css`
    > div {
      padding: ${getPadding(props.size)};
    }
    font-weight: ${props.theme.fontWeight.black};
  `};
  .${ICON_CLASSNAME} {
    margin-left: 3px;
  }
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `};
`

export const TableHeadCell = ({ children, sortRowsHandler, isSortable, sortMode, size }) => (
  <TableHeadCellWrapper
    onClick={isSortable ? sortRowsHandler : null}
    sortMode={sortMode}
    size={size}
  >
    <div>
      {children}
      {isSortable && (
        <ArrowIcon
          pointingDown={sortMode === SORT_MODES.descending}
          inactive={sortMode === SORT_MODES.unsorted}
        />
      )}
    </div>
  </TableHeadCellWrapper>
)

TableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
  sortRowsHandler: PropTypes.func.isRequired,
  isSortable: PropTypes.bool.isRequired,
  sortMode: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}
