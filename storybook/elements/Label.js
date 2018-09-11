import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
} from '../helpers'
import { default as EnhancedLabel, Label } from '~/elements/Label'

const defaultText = 'Label Text'
const getDefaultProps = () => ({
  children: getTextKnob({ defaultText }),
})

storiesOf('Elements/Label', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Label))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedLabel]),
    },
  })
  .add('default', () => <EnhancedLabel {...getDefaultProps()} />)
