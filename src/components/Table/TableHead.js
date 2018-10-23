import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { SORT_MODES, SIZES, CELL_MIN_WIDTH, AUX_CELL_CLASSNAME } from '~/components/Table/utils'
import { ArrowIcon } from '~/components/Table/tableIcons'
import { ICON_CLASSNAME } from '~/elements/Icon'

const getYPadding = size =>
  ({
    [SIZES.small]: { top: '8px', bottom: '4px' },
    [SIZES.medium]: { top: '15px', bottom: '12px' },
    [SIZES.large]: { top: '15px', bottom: '12px' },
  }[size])

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
    .${AUX_CELL_CLASSNAME} {
      padding-top: ${getYPadding(props.size).top};
      padding-bottom: ${getYPadding(props.size).bottom};
    }
  `};
`

const TableHeadCellWrapper = styled.th`
  > div {
    display: flex;
    align-items: flex-start;
    min-width: ${CELL_MIN_WIDTH};
  }
  ${props => css`
    > div {
      padding-top: ${getYPadding(props.size).top};
      padding-bottom: ${getYPadding(props.size).bottom};
      padding-left: 24px;
      padding-right: 24px;
    }
    font-weight: ${props.theme.fontWeight.black};
    .${ICON_CLASSNAME} {
      margin-left: 3px;
      ${props.hideIconUntilHovered &&
        css`
          opacity: 0;
        `};
    }
    &:hover {
      .${ICON_CLASSNAME} {
        opacity: 1;
      }
    }
  `};
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `};
`

export const TableHeadCell = ({ children, sortChangeHandler, isSortable, sortMode, size }) => (
  <TableHeadCellWrapper
    onClick={isSortable ? sortChangeHandler : null}
    sortMode={sortMode}
    size={size}
    hideIconUntilHovered={sortMode === SORT_MODES.unsorted}
  >
    <div>
      {children}
      {isSortable && (
        <ArrowIcon
          pointingDown={sortMode === SORT_MODES.descending}
          inactive={sortMode === SORT_MODES.unsorted}
          style={{ marginTop: '-2px' }}
        />
      )}
    </div>
  </TableHeadCellWrapper>
)

TableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
  sortChangeHandler: PropTypes.func.isRequired,
  isSortable: PropTypes.bool.isRequired,
  sortMode: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}
