import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { default as EnhancedCheckbox, Checkbox } from '~/elements/Checkbox'

const defaultProps = {
  label: 'Checkbox text',
  onChange: action('checkbox click'),
}

storiesOf('Elements/Checkbox', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Checkbox, defaultProps))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedCheckbox]),
    },
  })
  .add('default', () => <EnhancedCheckbox {...defaultProps} />)
  .add('disabled', () => <EnhancedCheckbox disabled {...defaultProps} />)
