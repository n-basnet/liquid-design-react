import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedCheckbox, Checkbox } from '~/elements/Checkbox'

const defaultProps = {
  label: 'Checkbox text',
  onChange: action('checkbox click'),
}

const getCheckboxSnippet = props => `
  <Checkbox ${props || ``}label='Checkbox text' onChange={onChangeHandler} />
`

storiesOf('Elements/Checkbox', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Checkbox, defaultProps))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedCheckbox]),
      excludedPropTypes: ['className'],
    },
  })
  .add('default', () => <Checkbox {...defaultProps} />, getSnippetTemplate(getCheckboxSnippet()))
  .add(
    'disabled',
    () => <Checkbox disabled {...defaultProps} />,
    getSnippetTemplate(getCheckboxSnippet('disabled '))
  )
  .add(
    'disabled and checked',
    () => <Checkbox isChecked disabled {...defaultProps} />,
    getSnippetTemplate(getCheckboxSnippet('disabled '))
  )
