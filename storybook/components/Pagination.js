import React from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnchancedPagination, Pagination } from '~/components/Pagination'

import { getBackgroundWrapper, getSnippetTemplate, getPropTablesExcludeList } from '../helpers'
import { times } from '~/utils/misc'

const children = times(10000).map((item, index) => <div key={index}>{item}</div>)

const getPaginationSnippet = props => `
  <Pagination ${props || ``}>
    {items.map((item, index) => <div key={index}>{item}</div>)}
  </Pagination>
`

storiesOf('Components/Pagination', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTables: [Pagination],
      propTablesExclude: getPropTablesExcludeList([EnchancedPagination]),
    },
  })
  .add(
    'default',
    () => <EnchancedPagination>{children}</EnchancedPagination>,
    getSnippetTemplate(getPaginationSnippet())
  )
  .add(
    'custom items number',
    () => <EnchancedPagination itemsPerPage={10}>{children}</EnchancedPagination>,
    getSnippetTemplate(getPaginationSnippet(`itemsPerPage={10}`))
  )
  .add(
    'custom amount of numbers',
    () => <EnchancedPagination paginationNumberAmount={3}>{children}</EnchancedPagination>,
    getSnippetTemplate(getPaginationSnippet(`paginationNumberAmount={3}`))
  )
  .add(
    'disabled',
    () => <EnchancedPagination disabled>{children}</EnchancedPagination>,
    getSnippetTemplate(getPaginationSnippet(`disabled`))
  )
