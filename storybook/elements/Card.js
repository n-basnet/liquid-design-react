import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  includeComponentInPropTable,
} from '../helpers'
import { default as EnhancedCard, Card } from '~/elements/Card'

storiesOf('Elements/Card', module)
  .addDecorator(getBackgroundWrapper({ dark: true }))
  .addDecorator(includeComponentInPropTable(Card, { children: '' }))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedCard]),
    },
  })
  .add('default', () => <EnhancedCard>{getTextKnob()}</EnhancedCard>)
  .add('stacked', () => <EnhancedCard stacked>{getTextKnob()}</EnhancedCard>)
  .add('active', () => <EnhancedCard active>{getTextKnob()}</EnhancedCard>)
