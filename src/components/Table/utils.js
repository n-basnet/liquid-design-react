import { isEmpty, find, reject } from 'ramda'
import isReact from 'is-react'

export const AUX_CELL_WIDTH = 30

const isConfigCell = cell =>
  typeof cell !== 'string' && typeof cell !== 'number' && !isReact.compatible(cell)

export const findConfigCell = cells => find(isConfigCell, cells)

export const getCellsAndRowInfo = cells => ({
  cells: reject(isConfigCell, cells),
  rowConfigCell: findConfigCell(cells),
})

export const SORT_MODES = {
  ascending: 'ASCENDING',
  descending: 'DECENDING',
  unsorted: 'UNSORTED',
}

export const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export const DEFAULT_SORT_MODE = SORT_MODES.unsorted

export const sort = {
  [SORT_MODES.ascending]: (a, b) => {
    if (a.text < b.text) return -1
    if (a.text > b.text) return 1
    return 0
  },
  [SORT_MODES.descending]: (a, b) => {
    if (a.text < b.text) return 1
    if (a.text > b.text) return -1
    return 0
  },
  [SORT_MODES.unsorted]: (a, b) => a.originalIndex - b.originalIndex,
}

export const getSortedRows = ({ sortingColumnIndex, newSortMode, rows, tableRefs }) => {
  if (sortingColumnIndex === null || isEmpty(tableRefs)) {
    return rows
  }
  return rows
    .map(({ id: rowId, originalIndex }, index) => ({
      text: tableRefs[rowId][sortingColumnIndex].innerText,
      originalIndex,
      index,
    }))
    .sort(sort[newSortMode])
    .map(({ index }) => rows[index])
}

export const CELL_MIN_WIDTH = '100px'

export const TABLE_ROW_STATES = {
  isExpanded: 'isExpanded',
  isSelected: 'isSelected',
}
