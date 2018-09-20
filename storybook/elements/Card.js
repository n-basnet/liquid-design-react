import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  includeComponentInPropTable,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedCard, Card } from '~/elements/Card'

const getCardSnippet = props => `
  <Card${props || ``}>
    lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel
  </Card>
`

storiesOf('Elements/Card', module)
  .addDecorator(getBackgroundWrapper({ color: 'dark' }))
  .addDecorator(includeComponentInPropTable(Card, { children: '' }))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedCard]),
    },
  })
  .add(
    'default',
    () => <EnhancedCard>{getTextKnob()}</EnhancedCard>,
    getSnippetTemplate(getCardSnippet())
  )
  .add(
    'stacked',
    () => <EnhancedCard stacked>{getTextKnob()}</EnhancedCard>,
    getSnippetTemplate(getCardSnippet(' stacked'))
  )

  .add(
    'active',
    () => <EnhancedCard active>{getTextKnob()}</EnhancedCard>,
    getSnippetTemplate(getCardSnippet(' active'))
  )
