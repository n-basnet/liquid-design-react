import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { default as EnhancedSearchBar, SearchBar } from '~/components/SearchBar'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  includeComponentInPropTable,
  getTextKnob,
} from '../helpers'
import { times } from '~/utils/aux'

const getOptions = () =>
  times(4).map(v => {
    const text = getTextKnob({
      defaultText: `Search Result ${v + 1}`,
      name: `result ${v + 1}`,
    })
    return { text, onClick: action(`click on ${text}`) }
  })

storiesOf('Components/SearchBar', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(SearchBar))
  .addParameters({
    info: {
      source: false,
      propTablesExclude: getPropTablesExcludeList([EnhancedSearchBar]),
    },
  })
  .add('default', () => (
    <EnhancedSearchBar handleSubmit={action('submit')} options={getOptions()} />
  ))
  .add('ghost', () => (
    <EnhancedSearchBar ghost handleSubmit={action('submit')} options={getOptions()} />
  ))
  .add('disabled', () => <EnhancedSearchBar disabled />)
  .add('disabled ghost', () => <EnhancedSearchBar disabled ghost />)
