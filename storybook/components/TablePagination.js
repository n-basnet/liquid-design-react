import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, getPropTablesExcludeList } from '../helpers'
import TablePagination from '~/components/TablePagination'

const getDefaultProps = () => ({
  itemsCount: 798,
})

class TablePaginationApp extends PureComponent {
  state = {
    currentPage: 1,
    perPage: 10,
  }
  updateCurrentPage = currentPage => this.setState({ currentPage })
  updatePerPageAmount = perPage => this.setState({ perPage })
  render() {
    const { currentPage, perPage } = this.state
    return (
      <TablePagination
        {...getDefaultProps()}
        currentPage={currentPage}
        onChange={this.updateCurrentPage}
        itemsPerPageAmount={perPage}
        onItemsPerPageAmountChange={this.updatePerPageAmount}
      />
    )
  }
}

storiesOf('Components/TablePagination', module)
  .addDecorator(storyFn => (
    <div
      style={{
        paddingBottom: '270px',
        overflow: 'scroll',
      }}
    >
      {storyFn()}
    </div>
  ))
  .addDecorator(getBackgroundWrapper({ color: 'sensitiveGrey' }))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([TablePaginationApp]),
      propTables: [TablePagination],
      excludedPropTypes: ['className'],
    },
  })
  .add('default', () => <TablePaginationApp />)
