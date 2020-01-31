import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { times } from '../../src/utils/misc'
import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import EnhancedList, { List } from '../../src/elements/List'

const getListHead = () =>
  getTextKnob({ name: 'list head', defaultText: 'List head' })

const getListItem = (withIcon, disabled) => index => ({
  name: getTextKnob({
    name: `list item ${index + 1}`,
    defaultText: `List item ${index + 1}`,
  }),
  onClick: action(`click item ${index + 1}`),
  ...(withIcon && { iconName: 'placeholder' }),
  isDisabled: disabled && index === 1,
})

const getDefaultProps = (withIcon = true, disabled = false) => ({
  items: times(5).map(getListItem(withIcon, disabled)),
  listHead: {
    name: getListHead(),
    ...(withIcon && { iconName: 'placeholder' }),
  },
})

const getSnippet = (props, withIcon, disabled) => `
  <List
    items={[
      { name: 'List 01', onClick: onClickHandler${
        withIcon ? ", iconName: 'placeholder'" : ''
      } },
      { name: 'List 01', onClick: onClickHandler${
        withIcon ? ", iconName: 'placeholder'" : ''
      }${disabled ? ", isDisabled: 'true'" : ''} },
      { name: 'List 01', onClick: onClickHandler${
        withIcon ? ", iconName: 'placeholder'" : ''
      } },
    ]}
    listHead={{ name: 'List head'${
      withIcon ? ", iconName: 'placeholder'" : ''
    } }}${
  props
    ? `
    ${props}`
    : ''
}
  />
`

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedList]),
    propTables: [List],
  },
}

storiesOf('Elements/List', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(params)
  .add(
    'default',
    () => <EnhancedList {...getDefaultProps(false)} />,
    getSnippetTemplate(getSnippet()),
  )
  .add(
    'grey',
    () => <EnhancedList grey {...getDefaultProps(false)} />,
    getSnippetTemplate(getSnippet('grey')),
  )
  .add(
    'active',
    () => <EnhancedList activeItemIndex={1} {...getDefaultProps(false)} />,
    getSnippetTemplate(getSnippet('activeItemIndex={1}')),
  )
  .add(
    'disabled',
    () => <EnhancedList {...getDefaultProps(false, true)} />,
    getSnippetTemplate(getSnippet(null, null, true)),
  )

storiesOf('Elements/List/with icons', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(params)
  .add(
    'default',
    () => <EnhancedList {...getDefaultProps()} />,
    getSnippetTemplate(getSnippet(null, true)),
  )
  .add(
    'grey',
    () => <EnhancedList grey {...getDefaultProps()} />,
    getSnippetTemplate(getSnippet('grey', true)),
  )
  .add(
    'active',
    () => <EnhancedList activeItemIndex={1} {...getDefaultProps()} />,
    getSnippetTemplate(getSnippet('activeItemIndex={1}', true)),
  )
  .add(
    'disabled',
    () => <EnhancedList {...getDefaultProps(true, true)} />,
    getSnippetTemplate(getSnippet(true, true)),
  )
