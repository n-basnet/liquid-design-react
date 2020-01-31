import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '../../../components/Table/TableCell'
import {
  TABLE_ROW_STATES,
  AUX_CELL_CLASSNAME,
} from '../../../components/Table/utils'
import { getAuxComponent } from '../../../components/Table/tableIcons'
import RowWrapper from '../../../components/Table/TableRow/RowWrapper'

const TableRow = ({
  isSelectable,
  handleStateChange,
  cellsInfo,
  accessors,
  renderers,
  disabled,
  displayRowInfoArrow,
  size,
  rowState,
}) => {
  const getClickHandler = () => {
    if (!disabled) {
      return () =>
        handleStateChange(
          cellsInfo && cellsInfo.rowInfo
            ? TABLE_ROW_STATES.isExpanded
            : isSelectable
            ? TABLE_ROW_STATES.isSelected
            : null,
        )
    }
  }
  const renderAuxComponent = () => {
    const Component = getAuxComponent({
      rowInfoArrow: displayRowInfoArrow,
      checkbox: isSelectable,
      size,
    })
    return (
      Component && (
        <td className={AUX_CELL_CLASSNAME}>
          <Component
            {...(isSelectable && {
              isChecked: rowState.isSelected,
            })}
            {...(displayRowInfoArrow && { pointingDown: rowState.isExpanded })}
            disabled={disabled}
          />
        </td>
      )
    )
  }

  const shouldDisplayInfoRow = Boolean(rowState.isExpanded && cellsInfo.rowInfo)

  // access and render cells
  const cells = accessors
    .map(fn => fn(cellsInfo))
    .map((cell, index) => {
      const cellRenderer = renderers[index]
      return cellRenderer ? cellRenderer(cell, cellsInfo) : cell
    })

  return (
    <>
      <RowWrapper
        onClick={getClickHandler()}
        isExpanded={rowState.isExpanded}
        disabled={disabled}
        size={size}
      >
        {renderAuxComponent()}
        {cells.map((value, i) => (
          <TableCell key={i} size={size}>
            {value}
          </TableCell>
        ))}
      </RowWrapper>
      {shouldDisplayInfoRow && (
        <RowWrapper isInfoCell>
          <TableCell isInfoCell colSpan={cells.length + 1}>
            {cellsInfo.rowInfo}
          </TableCell>
        </RowWrapper>
      )}
    </>
  )
}

TableRow.propTypes = {
  cellsInfo: PropTypes.object.isRequired,
  /** if at least one other row has rowInfo, then info arrow has to be rendered for table layout consistency */
  displayRowInfoArrow: PropTypes.bool.isRequired,
  isSelectable: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
  rowState: PropTypes.object.isRequired,
  handleStateChange: PropTypes.func,
  disabled: PropTypes.bool,
  accessors: PropTypes.array.isRequired,
  renderers: PropTypes.array.isRequired,
}

TableRow.defaultProps = {
  handleStateChange: () => {},
  disabled: false,
}

export default TableRow
