import React from 'react'
import { storiesOf } from '@storybook/react'
import { omit } from 'ramda'

import Table from '../../../src/components/Table'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getStoriesByVersions,
} from '../../helpers'
import { getSnippet, DISABLED_ROW_INDEXES } from './utils'
import TableApp from './TableApp'
import TableFetchingApp from './TableFetchingApp'

const joinString = ' | '

const STORIES = getStoriesByVersions({
  joinString,
  versions: [
    { name: 'Small', props: {} },
    { name: 'Medium', props: { size: 'medium' } },
    { name: 'Large', props: { size: 'large', withMoreContent: true } },
  ],
  subversions: [
    { name: 'selectable', props: { isSelectable: true } },
    { name: 'with row content', props: { withRowContent: true } },
    { name: 'with images', props: { withImages: true } },
    { name: 'with pagination', props: { withPagination: true } },
    {
      name: 'with pagination below table',
      props: { withPagination: true, paginationBelow: true },
    },
    {
      name: 'selectable with pagination',
      props: { withPagination: true, isSelectable: true },
    },
  ],
})

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([TableApp, TableFetchingApp]),
    propTables: [Table],
    excludedPropTypes: ['className'],
  },
}

STORIES.map(({ name, props = {} }) => {
  const tableProps = omit(
    ['withMoreContent', 'withRowContent', 'withImages'],
    props,
  )
  const [groupName, storyName] = name.split(joinString)

  // filter generated stories
  if (props.withImages && props.size !== 'large') {
    return
  }

  storiesOf(`Components/Table/${groupName}`, module)
    .addDecorator(getBackgroundWrapper())
    .addParameters(params)
    .add(
      storyName || 'default',
      () => (
        <TableApp
          {...tableProps}
          passedProps={props}
          disabledRowsIndexes={DISABLED_ROW_INDEXES}
        />
      ),
      getSnippet({ props, tableProps }),
    )
})

storiesOf('Components/Table/etc', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(params)
  .add(
    'with external sorting',
    () => <TableFetchingApp />,
    getSnippet({
      hideCode: true,
      auxText: `
In this example, GitHub API is used as a source of the data. On sorting a row other than "id", a request will be made to the API to get sorted data from the server.
This is achieved by providing an \`onSort\` handler for these columns.
  `,
    }),
  )
