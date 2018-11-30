import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table, { TABLE_CLASSNAME } from '~/components/Table'
import { Fragment } from '../../helpers'
import { PLACEHOLDER_CLASSNAME } from '~/elements/Placeholder'
import { getDefaultProps } from './utils'

const COLUMNS_AMOUNT = 4

export default class extends PureComponent {
  static propTypes = {
    passedProps: PropTypes.object,
    withPagination: PropTypes.bool,
  }
  static defaultProps = {
    passedProps: {},
    withPagination: false,
  }
  state = {
    rowsAmount: this.props.withPagination ? 100 : 10,
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
          .${TABLE_CLASSNAME}--large tbody .${TABLE_CLASSNAME}AuxCell {
            padding-top: 31px;
          }
        `}</style>
        <Table {...props} rows={rows} columns={columns} />
      </Fragment>
    )
  }
}
