import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import TableCell from '~/components/Table/TableCell'
import {
  getCellsAndRowInfo,
  TABLE_ROW_STATES,
  AUX_CELL_CLASSNAME,
  getTableCellYPadding,
} from '~/components/Table/utils'
import { getAuxComponent } from '~/components/Table/tableIcons'
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

const TableRow = ({
  displayCheckbox,
  handleStateChange,
  cellsInfo,
  disabled,
  displayRowInfoArrow,
  getRef,
  size,
  rowState,
}) => {
  const getClickHandler = () => {
    const { rowConfigCell } = getCellsAndRowInfo(cellsInfo)
    if (!disabled && (rowConfigCell || displayCheckbox)) {
      const type =
        rowConfigCell && rowConfigCell.rowInfo
          ? TABLE_ROW_STATES.isExpanded
          : TABLE_ROW_STATES.isSelected

      return () => handleStateChange(type)
    }
  }
  const renderAuxComponent = () => {
    const Component = getAuxComponent({
      rowInfoArrow: displayRowInfoArrow,
      checkbox: displayCheckbox,
      size,
    })
    return (
      Component && (
        <td className={AUX_CELL_CLASSNAME}>
          <Component
            {...displayCheckbox && {
              isChecked: rowState.isSelected,
            }}
            {...displayRowInfoArrow && { pointingDown: rowState.isExpanded }}
            disabled={disabled}
          />
        </td>
      )
    )
  }

  const { cells, rowConfigCell } = getCellsAndRowInfo(cellsInfo)

  const shouldDisplayInfoRow = Boolean(
    rowConfigCell && rowState.isExpanded && rowConfigCell.rowInfo
  )

  return (
    <Fragment>
      <RowWrapper
        onClick={getClickHandler()}
        isExpanded={rowState.isExpanded}
        disabled={disabled}
        size={size}
      >
        {renderAuxComponent()}
        {cells.map((value, i) => (
          <TableCell innerRef={ref => getRef(ref, i)} key={i} size={size}>
            {value}
          </TableCell>
        ))}
      </RowWrapper>
      {shouldDisplayInfoRow && (
        <RowWrapper isInfoCell>
          <TableCell isInfoCell colSpan={cells.length + 1}>
            {rowConfigCell.rowInfo}
          </TableCell>
        </RowWrapper>
      )}
    </Fragment>
  )
}

TableRow.propTypes = {
  cellsInfo: PropTypes.array.isRequired,
  displayRowInfoArrow: PropTypes.bool.isRequired,
  displayCheckbox: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
  rowState: PropTypes.object.isRequired,
  getRef: PropTypes.func,
  handleStateChange: PropTypes.func,
  disabled: PropTypes.bool,
}

TableRow.defaultProps = {
  getRef: () => {},
  handleStateChange: () => {},
  disabled: false,
}

export default TableRow
