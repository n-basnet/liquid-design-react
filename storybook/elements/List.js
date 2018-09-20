import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { times } from '~/utils/aux'
import {
  getBackgroundWrapper,
  getTextKnob,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedList, List } from '~/elements/List'

const getListHead = () => getTextKnob({ name: 'list head', defaultText: 'List head 01' })

const getListItem = id => getTextKnob({ name: `list item ${id}`, defaultText: 'List 01' })

const getItems = () => times(5).map(getListItem)

const getDefaultProps = (withIcons = true) => ({
  ...(withIcons && { icon: 'star' }),
  items: getItems(),
  listHead: getListHead(),
  onClick: action('click'),
})

const getListWithIconsSnippet = props => `
  <List
    icon="star"
    items={[
      'List 01',
      'List 01',
      'List 01',
      …
    ]}
    listHead="List head 01"
    onClick={onClickHandler}${props || ``}
  />
`
const getListWithoutIconsSnippet = props => `
  <List
    items={[
      'List 01',
      'List 01',
      'List 01',
      …
    ]}
    listHead="List head 01"
    onClick={onClickHandler}${props || ``}
  />
`

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedList]),
  },
}

storiesOf('Elements/List/list with icons', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(List, getDefaultProps()))
  .addParameters(params)
  .add(
    'transparent',
    () => <EnhancedList {...getDefaultProps()} />,
    getSnippetTemplate(getListWithIconsSnippet())
  )
  .add(
    'grey',
    () => <EnhancedList grey {...getDefaultProps()} />,
    getSnippetTemplate(
      getListWithIconsSnippet(`
    grey`)
    )
  )
  .add(
    'active',
    () => <EnhancedList activeItemIndex={1} {...getDefaultProps()} />,
    getSnippetTemplate(
      getListWithIconsSnippet(`
    activeItemIndex={1}`)
    )
  )
  .add(
    'disabled',
    () => <EnhancedList disabledItemIndex={1} {...getDefaultProps()} />,
    getSnippetTemplate(
      getListWithIconsSnippet(`
    disabledItemIndex={1}`)
    )
  )

storiesOf('Elements/List/list without icons', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(List, getDefaultProps()))
  .addParameters(params)
  .add(
    'transparent',
    () => <EnhancedList {...getDefaultProps(false)} />,
    getSnippetTemplate(getListWithoutIconsSnippet())
  )
  .add(
    'grey',
    () => <EnhancedList grey {...getDefaultProps(false)} />,
    getSnippetTemplate(
      getListWithoutIconsSnippet(`
    grey`)
    )
  )
  .add(
    'active',
    () => <EnhancedList activeItemIndex={1} {...getDefaultProps(false)} />,
    getSnippetTemplate(
      getListWithoutIconsSnippet(`
    activeItemIndex={1}`)
    )
  )
  .add(
    'disabled',
    () => <EnhancedList disabledItemIndex={1} {...getDefaultProps(false)} />,
    getSnippetTemplate(
      getListWithoutIconsSnippet(`
    disabledItemIndex={1}`)
    )
  )
