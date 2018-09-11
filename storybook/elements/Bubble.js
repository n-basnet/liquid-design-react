import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { default as EnhancedBubble, Bubble } from '~/elements/Bubble'

storiesOf('Elements/Bubble', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Bubble))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedBubble]),
    },
  })
  .add('default', () => (
    <EnhancedBubble label={number('label', 2, { range: true, min: 2, max: 120, step: 4 })} />
  ))
  .add('info', () => <EnhancedBubble isInfo />)
  .add('warning', () => <EnhancedBubble isWarning />)
  .add('disabled', () => <EnhancedBubble label={2} disabled />)
