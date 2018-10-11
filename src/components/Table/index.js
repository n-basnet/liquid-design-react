import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import uniqid from 'uniqid'
import { assoc, findIndex, update, equals, assocPath, any, all, omit, values } from 'ramda'

import { getClassName } from '~/components/aux/hoc/attachClassName'
import TableRow from '~/components/Table/TableRow'
import TableWrapper from '~/components/Table/TableWrapper'
import TableContainer from '~/components/Table/TableContainer'
import { TableHead, TableHeadCell } from '~/components/Table/TableHead'
import { getAuxComponent } from '~/components/Table/tableIcons'
import {
  getSortedRows,
  DEFAULT_SORT_MODE,
  SORT_MODES,
  AUX_CELL_WIDTH,
  SIZES,
  findConfigCell,
  TABLE_ROW_STATES,
} from '~/components/Table/utils'

export const TABLE_CLASSNAME = getClassName({ name: 'Table' })

const INITIAL_SORTING_COLUMN_INDEX = null

export default class Table extends PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.node),
    /**
      Array of rows of table cells (strings or React components). If an object found in a row array, it will be treated as config object,
      with the following keys handled:
      - `rowInfo`: additional information to be displayed on cliking on a row
      - `isDefaultChecked`: if Table is `isSelectable`, this will be the default value for the row's checkbox
      - `onChange`: fired on row change - the argument passed will be an object:
        `{rowConfig: <original config object>, rowState: <updated state>}`
    */
    rows: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.shape({
            rowInfo: PropTypes.node,
            isDefaultChecked: PropTypes.bool,
            onChange: PropTypes.func,
          }),
        ])
      )
    ),
    isSortable: PropTypes.bool,
    isSelectable: PropTypes.bool,
    /** Either `small`, `medium`, or `large`. */
    size: PropTypes.oneOf(Object.keys(SIZES)),
    disabledRowsIndexes: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
  }
  static defaultProps = {
    columns: [],
    rows: [],
    isSortable: true,
    isSelectable: false,
    size: SIZES.small,
    disabledRowsIndexes: [],
    className: '',
  }
  state = {
    rows: [],
    disabledRowsIds: [],
    sortModes: this.props.columns.map(v => DEFAULT_SORT_MODE),
    sortingColumnIndex: INITIAL_SORTING_COLUMN_INDEX,
    rowWidth: null,
  }
  componentDidMount() {
    this.recomputeState(this.props)
  }
  componentDidUpdate(prevProps) {
    // cannot use memoization, because the sorting depends on DOM content (state update not only operating on data)
    if (!equals(this.props.rows, prevProps.rows)) {
      this.recomputeState(this.props, this.state)
    }
  }

  tableRefs = {}

  recomputeState = (
    { columns, rows, disabledRowsIndexes, isSelectable },
    { sortingColumnIndex } = { sortingColumnIndex: INITIAL_SORTING_COLUMN_INDEX }
  ) => {
    const rowsWithIds = rows.map((cells, originalIndex) => {
      const configCell = findConfigCell(cells)
      const initialState = configCell
        ? {
          ...(isSelectable && { isSelected: configCell.isDefaultChecked || false }),
        }
        : {}
      return {
        cells,
        state: initialState,
        id: uniqid(),
        originalIndex,
      }
    })
    this.setState(
      {
        rows: rowsWithIds,
        hasRowInfo: any(row => any(cell => !!cell.rowInfo, row), rows),
        disabledRowsIds: disabledRowsIndexes.map(
          index => index < rowsWithIds.length && rowsWithIds[index].id
        ),
      },
      this.sortRows
    )
  }

  getCurrentSortMode = () =>
    this.state.sortModes[this.state.sortingColumnIndex] || DEFAULT_SORT_MODE
  getNewSortMode = newSortingColumnIndex => {
    const modes = values(SORT_MODES)
    const newIndex = modes.indexOf(this.state.sortModes[newSortingColumnIndex]) + 1

    return modes[newIndex >= modes.length ? newIndex % modes.length : newIndex]
  }

  sortRows = newSortingColumnIndex => {
    const { sortModes, rows } = this.state
    const currentSortMode = this.getCurrentSortMode()
    const shouldUpdateSort = newSortingColumnIndex !== undefined
    const newSortMode = shouldUpdateSort
      ? this.getNewSortMode(newSortingColumnIndex)
      : currentSortMode
    const sortingColumnIndex = shouldUpdateSort
      ? newSortingColumnIndex
      : this.state.sortingColumnIndex
    this.setState({
      rows: getSortedRows({
        sortingColumnIndex,
        newSortMode,
        rows,
        tableRefs: this.tableRefs,
      }),
      sortingColumnIndex,
      sortModes: sortModes.map(
        (v, index) => (index === sortingColumnIndex ? newSortMode : DEFAULT_SORT_MODE)
      ),
    })
  }
  getSortChangeHandler = sortingColumnIndex => () => this.sortRows(sortingColumnIndex)

  handleRowOnChange = ({ cells, state }) => {
    const configCell = findConfigCell(cells)
    if (configCell && configCell.onChange) {
      configCell.onChange({ rowState: state, rowConfig: configCell })
    }
  }
  getRowStateChangeHandler = id => type => {
    const { rows } = this.state
    const rowIndex = findIndex(v => v.id === id, rows)
    const row = rows[rowIndex]

    this.updateRowWidth()

    const value = row.state[type]
    const updatedRowState = { ...row.state, [type]: !value }
    this.setState(
      {
        rows: update(rowIndex, { ...row, state: updatedRowState }, rows),
      },
      () => {
        this.handleRowOnChange(this.state.rows[rowIndex])
      }
    )
  }
  getNonDisabledRows = () => this.state.rows.filter(({ id }) => !this.isRowDisabled(id))
  areAllRowStateOfTypeTrue = type => all(v => !!v.state[type], this.getNonDisabledRows())
  areAnyRowStateOfTypeTrue = type => any(v => !!v.state[type], this.getNonDisabledRows())
  getGlobalChangeHandler = type => arg => {
    const { rows } = this.state

    this.updateRowWidth()

    const newValue =
      type === TABLE_ROW_STATES.isSelected
        ? this.areAllRowStateOfTypeTrue(type)
        : this.areAnyRowStateOfTypeTrue(type)

    this.setState(
      {
        rows: rows.map(row =>
          assoc(
            'state',
            { ...row.state, ...(!this.isRowDisabled(row.id) && { [type]: !newValue }) },
            row
          )
        ),
      },
      () => {
        this.state.rows.map(this.handleRowOnChange)
      }
    )
  }
  renderGlobalHandlerComponent = () => {
    const { hasRowInfo } = this.state
    const { isSelectable, size } = this.props

    const Component = getAuxComponent({ rowInfoArrow: hasRowInfo, checkbox: isSelectable, size })
    return Component ? (
      <th width={AUX_CELL_WIDTH}>
        <Component
          {...isSelectable && {
            onChange: this.getGlobalChangeHandler(TABLE_ROW_STATES.isSelected),
            isChecked: this.areAllRowStateOfTypeTrue(TABLE_ROW_STATES.isSelected),
          }}
          {...hasRowInfo && {
            onClick: this.getGlobalChangeHandler(TABLE_ROW_STATES.isExpanded),
            pointingDown: this.areAnyRowStateOfTypeTrue(TABLE_ROW_STATES.isExpanded),
          }}
        />
      </th>
    ) : null
  }

  isRowDisabled = id => this.state.disabledRowsIds.indexOf(id) >= 0

  // rows with rowInfo will try to expand the table on opening
  updateRowWidth = () => {
    const { hasRowInfo } = this.state
    if (hasRowInfo) {
      this.setState({ rowWidth: this.tableHeadRef.getBoundingClientRect().width })
    }
  }

  render() {
    const { rows, hasRowInfo, sortModes, rowWidth } = this.state
    const {
      columns,
      className,
      isSortable,
      isSelectable,
      disabledRowsIndexes,
      ...props
    } = this.props

    return (
      <TableContainer
        {...omit(['columns', 'rows'], props)}
        width={rowWidth}
        className={cx(TABLE_CLASSNAME, className)}
      >
        <TableWrapper>
          <TableHead
            innerRef={v => {
              this.tableHeadRef = v
            }}
          >
            <tr>
              {this.renderGlobalHandlerComponent()}
              {columns.map((columnNode, i) => (
                <TableHeadCell
                  key={i}
                  sortRowsHandler={this.getSortChangeHandler(i)}
                  isSortable={isSortable}
                  sortMode={sortModes[i]}
                  size={props.size}
                >
                  {columnNode}
                </TableHeadCell>
              ))}
            </tr>
          </TableHead>
          <tbody>
            {rows.map(({ cells, id, state }, i) => (
              <TableRow
                key={id}
                getRef={(ref, cellIndex) => {
                  this.tableRefs = assocPath([id, cellIndex], ref, this.tableRefs)
                }}
                disabled={this.isRowDisabled(id)}
                cellsInfo={cells}
                displayRowInfoArrow={hasRowInfo}
                displayCheckbox={isSelectable}
                size={props.size}
                rowState={state}
                handleStateChange={this.getRowStateChangeHandler(id)}
              />
            ))}
          </tbody>
        </TableWrapper>
      </TableContainer>
    )
  }
}
