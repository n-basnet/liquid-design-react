import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'

import Table, { TABLE_CLASSNAME } from '~/components/Table'
import { PLACEHOLDER_CLASSNAME } from '~/elements/Placeholder'
import { times } from '~/utils/aux'

import { getCustomPlaceholderText, Fragment } from '../../helpers'
import { NameCell, RegularCell, ColumnCell, RowInfoWrapper } from './cells'

const COLUMNS_AMOUNT = 4
const ROWS_AMOUNT = 10

const onChange = action('row change')

const getRow = ({ withRowContent, rowIndex, ...props }) => [
  <NameCell rowIndex={rowIndex} {...props} />,
  ...times(COLUMNS_AMOUNT - 1).map(i => (
    <RegularCell placeholderSeed={(i + 1) * rowIndex + 1} {...props} />
  )),
  {
    onChange,
    // every second one selected
    ...(props.isSelectable &&
      rowIndex % 2 === 0 && {
      isDefaultChecked: true,
    }),
    ...(withRowContent && {
      rowInfo: <RowInfoWrapper>{getCustomPlaceholderText()}</RowInfoWrapper>,
    }),
  },
]

const getDefaultProps = ({ rowsAmount, columnsAmount }, props) => ({
  columns: times(columnsAmount).map(ColumnCell),
  rows: times(rowsAmount).map(rowIndex => getRow({ ...props, rowIndex })),
})

export default class extends PureComponent {
  static propTypes = {
    passedProps: PropTypes.object.isRequired,
  }
  state = {
    rowsAmount: ROWS_AMOUNT,
    columnsAmount: COLUMNS_AMOUNT,
  }
  addOrSubstractRow = add => () =>
    this.setState(({ rowsAmount }) => ({ rowsAmount: Math.max(1, rowsAmount + (add ? 1 : -1)) }))
  render() {
    const { passedProps, ...props } = this.props
    const { rows, columns } = getDefaultProps(this.state, this.props.passedProps)
    return (
      <Fragment>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={this.addOrSubstractRow(true)}>add row</button>
          <button onClick={this.addOrSubstractRow(false)}>remove row</button>
        </div>
        <style>{`
          .${TABLE_CLASSNAME} tr:not([disabled]):hover .${PLACEHOLDER_CLASSNAME} g:nth-child(2) use {
            fill: #f3f3f7;
          }
        `}</style>
        <Table {...props} rows={rows} columns={columns} />
      </Fragment>
    )
  }
}
