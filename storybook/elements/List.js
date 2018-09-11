import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { times } from '~/utils/aux'
import { getTextKnob, includeComponentInPropTable, getPropTablesExcludeList } from '../helpers'
import { default as EnhancedList, List } from '~/elements/List'

const getListHead = () => getTextKnob({ name: 'listHead', defaultText: 'List head 01' })

const getListItem = id => getTextKnob({ name: `listItem ${id}`, defaultText: 'List 01' })

const getItems = () => times(5).map(getListItem)

const getDefaultProps = (withIcons = true) => ({
  ...(withIcons && { icon: 'star' }),
  items: getItems(),
  listHead: getListHead(),
  onClick: action('click'),
})

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedList]),
  },
}

storiesOf('Elements/List/list with icons', module)
  .addDecorator(includeComponentInPropTable(List, getDefaultProps()))
  .addParameters(params)
  .add('transparent', () => <EnhancedList {...getDefaultProps()} />)
  .add('grey', () => <EnhancedList grey {...getDefaultProps()} />)
  .add('active', () => <EnhancedList activeItemIndex={1} {...getDefaultProps()} />)
  .add('disabled', () => <EnhancedList disabledItemIndex={1} {...getDefaultProps()} />)

storiesOf('Elements/List/list without icons', module)
  .addDecorator(includeComponentInPropTable(List, getDefaultProps()))
  .addParameters(params)
  .add('transparent', () => <EnhancedList {...getDefaultProps(false)} />)
  .add('grey', () => <EnhancedList grey {...getDefaultProps(false)} />)
  .add('active', () => <EnhancedList activeItemIndex={1} {...getDefaultProps(false)} />)
  .add('disabled', () => <EnhancedList disabledItemIndex={1} {...getDefaultProps(false)} />)
