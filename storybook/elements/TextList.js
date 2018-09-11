import React from 'react'
import { storiesOf } from '@storybook/react'

import { getTextKnob, includeComponentInPropTable, getPropTablesExcludeList } from '../helpers'
import { default as EnhancedTextList, TextList } from '~/elements/TextList'

const getListItem = id => ({
  id,
  name: getTextKnob({
    name: `listItem ${id}`,
    defaultText: 'Lorem ipsum dolor sit amet',
  }),
})

const getItems = () => [
  {
    ...getListItem(1),
    items: [
      {
        ...getListItem(2),
        items: [getListItem(3)],
      },
      getListItem(4),
    ],
  },
  {
    ...getListItem(5),
    items: [
      {
        ...getListItem(6),
        items: [getListItem(7), getListItem(8), getListItem(9)],
      },
    ],
  },
  {
    ...getListItem(10),
  },
]

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedTextList]),
  },
}

const getDefaultProps = () => ({
  items: getItems(),
})

storiesOf('Elements/TextList', module)
  .addDecorator(includeComponentInPropTable(TextList, getDefaultProps()))
  .addParameters(params)
  .add('numbered list', () => <EnhancedTextList {...getDefaultProps()} />)

storiesOf('Elements/TextList', module)
  .addDecorator(includeComponentInPropTable(TextList, getDefaultProps()))
  .addParameters(params)
  .add('bullet list', () => <EnhancedTextList {...getDefaultProps()} listType='bullet' />)
