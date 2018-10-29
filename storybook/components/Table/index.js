import React from 'react'
import { storiesOf } from '@storybook/react'
import { omit } from 'ramda'

import Table from '~/components/Table'
import { getBackgroundWrapper, getPropTablesExcludeList, getStoriesByVersions } from '../../helpers'
import { getSnippet, DISABLED_ROW_INDEXES } from './utils'
import TableApp from './TableApp'

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
  ],
})

STORIES.map(({ name, props = {} }) => {
  const tableProps = omit(['withMoreContent', 'withRowContent', 'withImages'], props)
  const [groupName, storyName] = name.split(joinString)

  // filter generated stories
  if (props.withImages && props.size !== 'large') {
    return
  }

  storiesOf(`Components/Table/${groupName}`, module)
    .addDecorator(getBackgroundWrapper())
    .addParameters({
      info: {
        propTablesExclude: getPropTablesExcludeList([TableApp]),
        propTables: [Table],
        excludedPropTypes: [
          'className',
          'withPagination',
          'paginationDefaults',
          'paginationItemsPerPageOptions',
          'paginationBelow',
        ],
      },
    })
    .add(
      storyName || 'default',
      () => (
        <TableApp {...tableProps} passedProps={props} disabledRowsIndexes={DISABLED_ROW_INDEXES} />
      ),
      getSnippet(props, tableProps)
    )
})
