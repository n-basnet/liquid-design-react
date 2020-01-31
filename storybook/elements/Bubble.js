import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import EnhancedBubble, { Bubble } from '../../src/elements/Bubble'

const getBubbleSnippet = props => `
  <Bubble ${props || ''}/>
`

storiesOf('Elements/Bubble', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Bubble))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedBubble]),
    },
  })
  .add(
    'default',
    () => (
      <EnhancedBubble
        label={number('label', 2, { range: true, min: 2, max: 120, step: 4 })}
      />
    ),
    getSnippetTemplate(getBubbleSnippet('label={2}')),
  )
  .add(
    'info',
    () => <EnhancedBubble isInfo />,
    getSnippetTemplate(getBubbleSnippet('isInfo')),
  )
  .add(
    'warning',
    () => <EnhancedBubble isWarning />,
    getSnippetTemplate(getBubbleSnippet('isWarning')),
  )
  .add(
    'disabled',
    () => <EnhancedBubble label={2} disabled />,
    getSnippetTemplate(getBubbleSnippet('label={2} disabled')),
  )
