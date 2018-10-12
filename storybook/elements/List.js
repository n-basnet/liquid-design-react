import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { times } from '~/utils/aux'
import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedList, List } from '~/elements/List'

const getListHead = () => getTextKnob({ name: 'list head', defaultText: 'List head' })

const getListItem = withIcon => index => ({
  name: getTextKnob({
    name: `list item ${index + 1}`,
    defaultText: `List item ${index + 1}`,
  }),
  onClick: action(`click item ${index + 1}`),
  ...(withIcon && { iconName: 'star' }),
})

const getDefaultProps = (withIcon = true) => ({
  items: times(5).map(getListItem(withIcon)),
  listHead: { name: getListHead(), ...(withIcon && { iconName: 'star' }) },
})

const getSnippet = (props, withIcon) => `
  <List
    items={[
      { name: 'List 01', onClick: onClickHandler${withIcon ? `, iconName: 'star'` : ''} },
      { name: 'List 01', onClick: onClickHandler${withIcon ? `, iconName: 'star'` : ''} },
      { name: 'List 01', onClick: onClickHandler${withIcon ? `, iconName: 'star'` : ''} },
    ]}
    listHead={{ name: 'List head'${withIcon ? `, iconName: 'star'` : ''} }}${
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
    getSnippetTemplate(getSnippet())
  )
  .add(
    'grey',
    () => <EnhancedList grey {...getDefaultProps(false)} />,
    getSnippetTemplate(getSnippet(`grey`))
  )
  .add(
    'active',
    () => <EnhancedList activeItemIndex={1} {...getDefaultProps(false)} />,
    getSnippetTemplate(getSnippet(`activeItemIndex={1}`))
  )
  .add(
    'disabled',
    () => <EnhancedList disabledItemIndex={1} {...getDefaultProps(false)} />,
    getSnippetTemplate(getSnippet(`disabledItemIndex={1}`))
  )

storiesOf('Elements/List/with icons', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(params)
  .add(
    'default',
    () => <EnhancedList {...getDefaultProps()} />,
    getSnippetTemplate(getSnippet(null, true))
  )
  .add(
    'grey',
    () => <EnhancedList grey {...getDefaultProps()} />,
    getSnippetTemplate(getSnippet(`grey`, true))
  )
  .add(
    'active',
    () => <EnhancedList activeItemIndex={1} {...getDefaultProps()} />,
    getSnippetTemplate(getSnippet(`activeItemIndex={1}`, true))
  )
  .add(
    'disabled',
    () => <EnhancedList disabledItemIndex={1} {...getDefaultProps()} />,
    getSnippetTemplate(getSnippet(`disabledItemIndex={1}`, true))
  )
