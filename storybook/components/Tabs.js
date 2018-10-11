import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import { Tabs } from '~'
import {
  getTextKnob,
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'

const getTabData = id => ({
  name: getTextKnob({
    name: `Tab Head ${id}`,
    defaultText: `Tab Head ${id}`,
  }),
  content: getTextKnob({
    name: `Tab Content ${id}`,
    defaultText: `Tab Content ${id}`,
  }),
})

const getTabsData = () => [
  getTabData(1),
  getTabData(2),
  getTabData(3),
  getTabData(4),
  getTabData(5),
]

const disabledIndexes = [1, 2]

const getTabsSnippet = props => `
  <Tabs ${props ||
    ``} tabsData={getTabsData()} disabledIndexes={disabledIndexes} mobileSafariGap='80px' />
`

storiesOf('Components/Tabs', module)
  .addDecorator(getBackgroundWrapper())
  // Storybook style override is necessary to deal with mobile Safari `overflow: hidden` issue and scrolling issue in the Tabs component
  .addDecorator(storyFn => (
    <Fragment>
      <style>
        {`
          #storybook-main-element > div > :last-child {
            max-width: 100vw;
            overflow: scroll;
          }
        `}
      </style>
      {storyFn()}
    </Fragment>
  ))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([getBackgroundWrapper]),
    },
  })
  .add(
    'sticky',
    () => (
      <Tabs tabsData={getTabsData()} disabledIndexes={disabledIndexes} mobileSafariGap='80px' />
    ),
    getSnippetTemplate(getTabsSnippet('defaultValue={0}'))
  )
  .add(
    'bar',
    () => (
      <Tabs
        appearance='bar'
        tabsData={getTabsData()}
        disabledIndexes={disabledIndexes}
        mobileSafariGap='80px'
      />
    ),
    getSnippetTemplate(getTabsSnippet(`appearance='bar'`))
  )
