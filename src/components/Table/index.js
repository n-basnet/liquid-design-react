import React, { PureComponent } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import PropTypes from 'prop-types'
import cx from 'classnames'
import uniqid from 'uniqid'
import {
  contains,
  prop,
  assoc,
  findIndex,
  update,
  equals,
  any,
  all,
  omit,
  values,
} from 'ramda'

import { getClassName } from '../../components/misc/hoc/attachClassName'
import TableRow from '../../components/Table/TableRow'
import TableWrapper from '../../components/Table/TableWrapper'
import TableContainer from '../../components/Table/TableContainer'
import { TableHead, TableHeadCell } from '../../components/Table/TableHead'
import { getAuxComponent } from '../../components/Table/tableIcons'
import {
  getSortedRows,
  DEFAULT_SORT_MODE,
  SORT_MODES,
  AUX_CELL_WIDTH,
  SIZES,
  TABLE_ROW_STATES,
  AUX_CELL_CLASSNAME,
  renderNode,
} from '../../components/Table/utils'
import TablePagination from '../../components/TablePagination'

export const TABLE_CLASSNAME = getClassName({ name: 'Table' })

const INITIAL_SORTING_COLUMN_INDEX = undefined

export default class Table extends PureComponent {
  static propTypes = {
    /** Array of column objects. */
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
          .isRequired,
        accessor: PropTypes.func.isRequired,
        cellRenderer: PropTypes.func,
        sortMethod: PropTypes.func,
        onSort: PropTypes.func,
      }),
    ).isRequired,
    /** Array of row objects. */
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        rowInfo: PropTypes.node,
        isDefaultChecked: PropTypes.bool,
        onChange: PropTypes.func,
      }),
    ).isRequired,
    isSortable: PropTypes.bool,
    isSelectable: PropTypes.bool,
    /** Either `small`, `medium`, or `large`. */
    size: PropTypes.oneOf(Object.keys(SIZES)),
    disabledRowsIndexes: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    /** Display `TablePagination` above the table. */
    withPagination: PropTypes.bool,
    /** Default values for `TablePagination`. */
    paginationDefaults: PropTypes.shape({
      currentPage: PropTypes.number,
      itemsPerPageAmount: PropTypes.number,
    }),
    /** For `itemsPerPageOptions` prop on `TablePagination`. */
    paginationItemsPerPageOptions: PropTypes.array,
    /** By default, pagination will be placed above the table - use this prop to change it's placement to below the table */
    paginationBelow: PropTypes.bool,
  }

  static defaultProps = {
    columns: [],
    rows: [],
    isSortable: true,
    isSelectable: false,
    size: SIZES.small,
    disabledRowsIndexes: [],
    className: '',
    withPagination: false,
    paginationDefaults: {
      currentPage: 1,
      itemsPerPageAmount: 10,
    },
    paginationItemsPerPageOptions:
      TablePagination.defaultProps.itemsPerPageOptions,
    paginationBelow: false,
  }

  state = {
    rows: [],
    disabledRowsIds: [],
    sortModes: this.props.columns.map(v => DEFAULT_SORT_MODE),
    sortingColumnIndex: INITIAL_SORTING_COLUMN_INDEX,
    paginationCurrentPage: this.props.paginationDefaults.currentPage,
    paginationPerPage: this.props.paginationDefaults.itemsPerPageAmount,
  }

  componentDidMount() {
    this.recomputeState(this.props)
  }

  componentDidUpdate(prevProps) {
    if (!equals(this.props.rows, prevProps.rows)) {
      this.recomputeState(this.props, this.state)
    }
  }

  tableElementHTMLId = getClassName({ name: `Table--${uniqid()}` })

  recomputeState = (
    { columns, rows, disabledRowsIndexes, isSelectable },
    { sortingColumnIndex } = {
      sortingColumnIndex: INITIAL_SORTING_COLUMN_INDEX,
    },
  ) => {
    const preparedRows = rows.map((cells, initialIndex) => ({
      cells,
      state: {
        ...(isSelectable && { isSelected: cells.isDefaultChecked || false }),
      },
      id: uniqid(),
      initialIndex,
    }))

    const { sortModes } = this.state

    this.setState(
      {
        rows: preparedRows,
        sortModes,
        hasRowInfo: any(row => !!row.cells.rowInfo, preparedRows),
        disabledRowsIds: disabledRowsIndexes.map(
          index => index < preparedRows.length && preparedRows[index].id,
        ),
      },
      this.updateSorting,
    )
  }

  getCurrentSortMode = () =>
    this.state.sortModes[this.state.sortingColumnIndex] || DEFAULT_SORT_MODE

  getNewSortMode = newSortingColumnIndex => {
    const modes = values(SORT_MODES)
    const newIndex =
      modes.indexOf(this.state.sortModes[newSortingColumnIndex]) + 1

    return modes[newIndex >= modes.length ? newIndex % modes.length : newIndex]
  }

  updateSorting = sortingColumnIndex => {
    const { columns } = this.props
    const { sortModes } = this.state
    const shouldUpdateSort = sortingColumnIndex !== undefined
    if (!shouldUpdateSort) {
      return
    }

    const sortMode = this.getNewSortMode(sortingColumnIndex)
    const sortColumn = columns[sortingColumnIndex]
    if (sortColumn.onSort) {
      sortColumn.onSort({ sortColumn, sortMode })
    }

    this.setState({
      sortingColumnIndex,
      sortModes: sortModes.map(
        // resetting all other columns' sort modes
        (v, index) =>
          index === sortingColumnIndex ? sortMode : DEFAULT_SORT_MODE,
      ),
    })
  }

  getSortChangeHandler = sortingColumnIndex => () =>
    this.updateSorting(sortingColumnIndex)

  handleRowOnChange = ({ cells, state: rowState }) =>
    cells.onChange && cells.onChange({ rowState, cells })

  getRowStateChangeHandler = id => type => {
    const { rows } = this.state
    const rowIndex = findIndex(v => v.id === id, rows)
    const row = rows[rowIndex]

    const value = row.state[type]
    const updatedRowState = { ...row.state, ...(type && { [type]: !value }) }
    this.setState(
      {
        rows: update(rowIndex, { ...row, state: updatedRowState }, rows),
      },
      () => {
        this.handleRowOnChange(this.state.rows[rowIndex])
      },
    )
  }

  getNonDisabledVisibleRows = () =>
    this.getVisibleRows().filter(({ id }) => !this.isRowDisabled(id))

  areAllRowStateOfTypeTrue = type =>
    all(v => !!v.state[type], this.getNonDisabledVisibleRows())

  areAnyRowStateOfTypeTrue = type =>
    any(v => !!v.state[type], this.getNonDisabledVisibleRows())

  getGlobalChangeHandler = type => arg => {
    const { rows } = this.state

    const visibleRows = this.getVisibleRows()
    const visibleRowsIds = visibleRows.map(prop('id'))

    const newValue =
      type === TABLE_ROW_STATES.isSelected
        ? this.areAllRowStateOfTypeTrue(type)
        : this.areAnyRowStateOfTypeTrue(type)

    this.setState(
      {
        rows: rows.map(row => {
          const shouldUpdateRow =
            !this.isRowDisabled(row.id) && contains(row.id, visibleRowsIds)
          return assoc(
            'state',
            { ...row.state, ...(shouldUpdateRow && { [type]: !newValue }) },
            row,
          )
        }),
      },
      () => visibleRows.map(this.handleRowOnChange),
    )
  }

  renderGlobalHandlerComponent = () => {
    const { hasRowInfo } = this.state
    const { isSelectable, size } = this.props

    const Component = getAuxComponent({
      rowInfoArrow: hasRowInfo,
      checkbox: isSelectable,
      size,
    })
    return Component ? (
      <th width={AUX_CELL_WIDTH} className={AUX_CELL_CLASSNAME}>
        <Component
          {...(isSelectable && {
            onChange: this.getGlobalChangeHandler(TABLE_ROW_STATES.isSelected),
            isChecked: this.areAllRowStateOfTypeTrue(
              TABLE_ROW_STATES.isSelected,
            ),
          })}
          {...(hasRowInfo && {
            onClick: this.getGlobalChangeHandler(TABLE_ROW_STATES.isExpanded),
            pointingDown: this.areAnyRowStateOfTypeTrue(
              TABLE_ROW_STATES.isExpanded,
            ),
          })}
        />
      </th>
    ) : null
  }

  isRowDisabled = id => contains(id, this.state.disabledRowsIds)

  handlePaginationChange = paginationCurrentPage =>
    this.setState({ paginationCurrentPage }, this.updateSorting)

  handlePaginationItemsPerPageAmountChange = paginationPerPage =>
    this.setState({ paginationPerPage }, this.updateSorting)

  // return the subset of rows that should be displayed on the current page
  getRowsForCurrentPage = rows => {
    const { withPagination } = this.props
    const { paginationCurrentPage, paginationPerPage } = this.state
    return withPagination
      ? rows.slice(
          (paginationCurrentPage - 1) * paginationPerPage,
          paginationCurrentPage * paginationPerPage,
        )
      : rows
  }

  getVisibleRows = () => {
    const { rows, sortingColumnIndex } = this.state
    const { columns } = this.props

    // prevent internal sorting
    const isSortedExternally =
      sortingColumnIndex >= 0 && columns[sortingColumnIndex].onSort
    if (isSortedExternally) {
      return rows
    }
    // sort all rows, not just currently visible
    const sortedRows = getSortedRows({
      sortingColumnIndex,
      sortMode: this.getCurrentSortMode(),
      columns,
      rows,
    })

    // of these sorted rows, return only the rows for current page
    return this.getRowsForCurrentPage(sortedRows)
  }

  renderWrappedTablePagination = () => {
    const { rows, paginationCurrentPage, paginationPerPage } = this.state
    const {
      columns,
      withPagination,
      paginationItemsPerPageOptions,
      paginationBelow,
    } = this.props

    const tablePaginationProps = {
      currentPage: paginationCurrentPage,
      itemsPerPageAmount: paginationPerPage,
      itemsCount: rows.length,
      itemsPerPageOptions: paginationItemsPerPageOptions,
      onChange: this.handlePaginationChange,
      onItemsPerPageAmountChange: this.handlePaginationItemsPerPageAmountChange,
      isDisplayedBelowTable: paginationBelow,
      style: { [`margin${paginationBelow ? 'Top' : 'Bottom'}`]: '10px' },
    }

    // in order to be of the same width as the table,
    // pagination is wrapped in a single full-width column
    return withPagination ? (
      <thead>
        <tr>
          <td colSpan={columns.length}>
            <TablePagination {...tablePaginationProps} />
          </td>
        </tr>
      </thead>
    ) : null
  }

  render() {
    const { hasRowInfo, sortModes } = this.state
    const {
      className,
      isSortable,
      isSelectable,
      disabledRowsIndexes,
      size,
      withPagination,
      paginationItemsPerPageOptions,
      paginationBelow,
      columns,
      ...props
    } = this.props

    const rowProps = {
      displayRowInfoArrow: hasRowInfo,
      isSelectable,
      size,
    }

    return (
      <ReactResizeDetector
        handleWidth
        resizableElementId={this.tableElementHTMLId}
      >
        <TableContainer
          {...omit(['columns', 'rows'], props)}
          className={cx(
            TABLE_CLASSNAME,
            `${TABLE_CLASSNAME}--${size}`,
            className,
          )}
        >
          <TableWrapper id={this.tableElementHTMLId} size={size}>
            {!paginationBelow && this.renderWrappedTablePagination()}
            <TableHead size={size}>
              <tr>
                {this.renderGlobalHandlerComponent()}
                {columns.map((column, i) => (
                  <TableHeadCell
                    key={i}
                    sortChangeHandler={this.getSortChangeHandler(i)}
                    isSortable={isSortable}
                    sortMode={sortModes[i]}
                    size={size}
                  >
                    {renderNode(column.header, column)}
                  </TableHeadCell>
                ))}
              </tr>
            </TableHead>
            <tbody>
              {this.getVisibleRows().map(({ cells, id, state }) => (
                <TableRow
                  key={id}
                  disabled={this.isRowDisabled(id)}
                  accessors={columns.map(prop('accessor'))}
                  renderers={columns.map(prop('cellRenderer'))}
                  cellsInfo={cells}
                  rowState={state}
                  handleStateChange={this.getRowStateChangeHandler(id)}
                  {...rowProps}
                />
              ))}
            </tbody>

            {paginationBelow && this.renderWrappedTablePagination()}
          </TableWrapper>
        </TableContainer>
      </ReactResizeDetector>
    )
  }
}
