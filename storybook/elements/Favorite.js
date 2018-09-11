import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { default as EnhancedFavorite, Favorite } from '~/elements/Favorite'

storiesOf('Elements/Favorite', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Favorite))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedFavorite]),
    },
  })
  .add('default', () => <EnhancedFavorite onChange={action('toggle favorite')} />)
  .add('disabled', () => <EnhancedFavorite disabled />)
  .add('active', () => <EnhancedFavorite active onChange={action('toggle favorite')} />)
