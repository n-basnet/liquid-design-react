import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { default as EnhancedSearchBar, SearchBar } from '~/components/SearchBar'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'
import { times } from '~/utils/misc'

const getOptions = () =>
  times(4).map(v =>
    getTextKnob({
      defaultText: `Search Result ${v + 1}`,
      name: `result ${v + 1}`,
    })
  )

const getSearchBarSnippet = props => `
  <SearchBar
    onSubmit={handleSubmit}
    options={[
      'Search Result 1',
      'Search Result 2',
      'Search Result 3',
      'Search Result 4',
    ]}${props || ``}
  />
`

const getDefaultProps = () => ({
  onSubmit: action('submit'),
  placeholder: getTextKnob({ defaultText: 'Search…', name: 'placeholder' }),
  options: getOptions(),
})

storiesOf('Components/SearchBar', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedSearchBar]),
      propTables: [SearchBar],
      excludedPropTypes: ['className'],
    },
  })
  .add(
    'default',
    () => <EnhancedSearchBar {...getDefaultProps()} />,
    getSnippetTemplate(getSearchBarSnippet())
  )
  .add(
    'ghost',
    () => <EnhancedSearchBar ghost {...getDefaultProps()} />,
    getSnippetTemplate(
      getSearchBarSnippet(`
    ghost`)
    )
  )
  .add(
    'disabled',
    () => <EnhancedSearchBar disabled />,
    getSnippetTemplate(
      getSearchBarSnippet(`
    disabled`)
    )
  )
  .add(
    'disabled ghost',
    () => <EnhancedSearchBar disabled ghost />,
    getSnippetTemplate(
      getSearchBarSnippet(`
    disabled
    ghost`)
    )
  )
