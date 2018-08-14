import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { List } from '~'
import { getTextKnob } from '../helpers'

const getListHead = () =>
  getTextKnob({ name: 'listHead', defaultText: 'List head 01' })

const getListItem = () =>
  getTextKnob({ name: 'listItem', defaultText: 'List 01' })

const items = []
let i
for (i = 0; i < 5; i++) {
  items.push(getListItem())
}

storiesOf('Elements/List/list with icons', module)
  .add('transparent', () => (
    <List
      icon='star'
      items={items}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
  .add('grey', () => (
    <List
      grey
      icon='star'
      items={items}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
  .add('active', () => (
    <List
      activeItemIndex={1}
      icon='star'
      items={items}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
  .add('disabled', () => (
    <List
      disabledItemIndex={1}
      icon='star'
      items={items}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))

storiesOf('Elements/List/list without icons', module)
  .add('transparent', () => (
    <List items={items} listHead={getListHead()} onClick={action('click')} />
  ))
  .add('grey', () => (
    <List
      grey
      items={items}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
  .add('active', () => (
    <List
      activeItemIndex={1}
      items={items}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
  .add('disabled', () => (
    <List
      disabledItemIndex={1}
      items={items}
      listHead={getListHead()}
      onClick={action('click')}
    />
  ))
