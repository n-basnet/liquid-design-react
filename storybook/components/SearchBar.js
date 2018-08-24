import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { default as EnhancedSearchBar, SearchBar } from '~/components/SearchBar'
import { getBackgroundWrapper, getTextKnob } from '../helpers'
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
  .addDecorator(storyFn => (
    <Fragment>
      {/* just to make addon-info aware of the original `SearchBar` props */}
      <div style={{ display: 'none' }}>
        <SearchBar />
      </div>
      {storyFn()}
    </Fragment>
  ))
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [EnhancedSearchBar, Fragment],
    },
  })
  .add('default', () => (
    <EnhancedSearchBar handleSubmit={action('submit')} options={getOptions()} />
  ))
  .add('ghost', () => (
    <EnhancedSearchBar
      ghost
      handleSubmit={action('submit')}
      options={getOptions()}
    />
  ))
  .add('disabled', () => <EnhancedSearchBar disabled />)
  .add('disabled ghost', () => <EnhancedSearchBar disabled ghost />)
