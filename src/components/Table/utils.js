import { path, isEmpty, find, reject } from 'ramda'
import isReact from 'is-react'
import naturalSort from 'javascript-natural-sort'

import { getClassName } from '~/components/aux/hoc/attachClassName'

export const AUX_CELL_CLASSNAME = getClassName({ name: 'TableAuxCell' })
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
  [SORT_MODES.ascending]: (a, b) => naturalSort(a.text, b.text),
  [SORT_MODES.descending]: (a, b) => naturalSort(b.text, a.text),
  [SORT_MODES.unsorted]: (a, b) => a.originalIndex - b.originalIndex,
}

export const getSortedRows = ({ sortingColumnIndex = 0, sortMode, rows, tableRefs }) => {
  if (isEmpty(tableRefs)) {
    return rows
  }
  return rows
    .map(({ id: rowId, originalIndex }, index) => {
      // with pagination, a cell might not be in tableRefs before the sorting,
      // so it will be sorted two times - first with '' as text, then - after the ref is there - with actual content
      const cellNode = path([rowId, sortingColumnIndex], tableRefs)
      const text = cellNode ? cellNode.innerText : ''
      return {
        text,
        originalIndex,
        index,
      }
    })
    .sort(sort[sortMode])
    .map(({ index }) => rows[index])
}

export const CELL_MIN_WIDTH = '100px'

export const TABLE_ROW_STATES = {
  isExpanded: 'isExpanded',
  isSelected: 'isSelected',
}

export const getTableCellYPadding = size =>
  ({
    [SIZES.small]: '6px',
    [SIZES.medium]: '14px',
    [SIZES.large]: '21px',
  }[size])
