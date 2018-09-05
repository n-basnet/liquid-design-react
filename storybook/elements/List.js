import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { List } from '~'
import { times } from '~/utils/aux'
import { getTextKnob } from '../helpers'

const getListHead = () => getTextKnob({ name: 'listHead', defaultText: 'List head 01' })

const getListItem = id => getTextKnob({ name: `listItem ${id}`, defaultText: 'List 01' })

const getItems = () => times(5).map(getListItem)

storiesOf('Elements/List/list with icons', module)
  .add('transparent', () => (
    <List icon='star' items={getItems()} listHead={getListHead()} onClick={action('click')} />
  ))
  .add('grey', () => (
    <List grey icon='star' items={getItems()} listHead={getListHead()} onClick={action('click')} />
  ))
  .add('active', () => (
    <List
      activeItemIndex={1}
      icon='star'
      items={getItems()}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
  .add('disabled', () => (
    <List
      disabledItemIndex={1}
      icon='star'
      items={getItems()}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))

storiesOf('Elements/List/list without icons', module)
  .add('transparent', () => (
    <List items={getItems()} listHead={getListHead()} onClick={action('click')} />
  ))
  .add('grey', () => (
    <List grey items={getItems()} listHead={getListHead()} onClick={action('click')} />
  ))
  .add('active', () => (
    <List
      activeItemIndex={1}
      items={getItems()}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
  .add('disabled', () => (
    <List
      disabledItemIndex={1}
      items={getItems()}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
