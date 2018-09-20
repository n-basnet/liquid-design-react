import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedFavorite, Favorite } from '~/elements/Favorite'

const getFavoriteSnippet = props => `
  <Favorite ${props || ``} onChange={onChangeHandler} />
`

storiesOf('Elements/Favorite', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Favorite))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedFavorite]),
    },
  })
  .add(
    'default',
    () => <EnhancedFavorite onChange={action('toggle favorite')} />,
    getSnippetTemplate(getFavoriteSnippet())
  )
  .add(
    'disabled',
    () => <EnhancedFavorite disabled />,
    getSnippetTemplate(getFavoriteSnippet('disabled'))
  )
  .add(
    'active',
    () => <EnhancedFavorite active onChange={action('toggle favorite')} />,
    getSnippetTemplate(getFavoriteSnippet('active'))
  )
