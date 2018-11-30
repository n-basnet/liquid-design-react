import { prop } from 'ramda'
import naturalSort from 'javascript-natural-sort'

import { getClassName } from '~/components/aux/hoc/attachClassName'

export const AUX_CELL_CLASSNAME = getClassName({ name: 'TableAuxCell' })
export const AUX_CELL_WIDTH = 30

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

export const getSortingObject = fn => ({
  [SORT_MODES.ascending]: (a, b) => fn(a.stringValue, b.stringValue),
  [SORT_MODES.descending]: (a, b) => fn(b.stringValue, a.stringValue),
  [SORT_MODES.unsorted]: (a, b) => a.initialIndex - b.initialIndex,
})

export const getSortedRows = ({ sortMode, sortingColumnIndex, rows, columns }) => {
  if (sortingColumnIndex === undefined) {
    return rows
  }
  const sortingColumn = columns[sortingColumnIndex]
  const sortingFunction = prop('sortMethod', sortingColumn) || naturalSort
  const sortingFn = getSortingObject(sortingFunction)[sortMode]
  return rows
    .map(({ id, initialIndex, cells }, index) => {
      let stringValue = ''
      const cell = sortingColumn && sortingColumn.accessor(cells)
      if (cell) {
        stringValue = typeof cell === 'object' ? prop('value', cell) : cell
      }

      return {
        stringValue,
        initialIndex,
        index,
      }
    })
    .sort(sortingFn)
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

export const renderNode = (node, props) => (typeof node === 'function' ? node(props) : node)
