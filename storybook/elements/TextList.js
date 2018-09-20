import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getTextKnob,
  getSnippetTemplate,
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
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

const getTextListSnippet = props => `
  <TextList
    items={[
      {id: 1,name: 'Lorem ipsum dolor sit amet',items: [
        {id: 2,name: 'Lorem ipsum dolor sit amet',items: [
          {id: 3,name: 'Lorem ipsum dolor sit amet'}
        ]},
        {id: 4,name: 'Lorem ipsum dolor sit amet'}
      ]},
      {id: 5,name: 'Lorem ipsum dolor sit amet',items: [
        {id: 6,name: 'Lorem ipsum dolor sit amet',items: [
          {id: 7,name: 'Lorem ipsum dolor sit amet'},
          {id: 8,name: 'Lorem ipsum dolor sit amet'},
          {id: 9,name: 'Lorem ipsum dolor sit amet'}
        ]}
      ]},
      {id: 10,name: 'Lorem ipsum dolor sit amet'}${props || ``}
    ]}
  />
`

storiesOf('Elements/TextList', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(TextList, getDefaultProps()))
  .addParameters(params)
  .add(
    'numbered list',
    () => <EnhancedTextList {...getDefaultProps()} />,
    getSnippetTemplate(getTextListSnippet())
  )
  .add(
    'bullet list',
    () => <EnhancedTextList {...getDefaultProps()} listType='bullet' />,
    getSnippetTemplate(
      getTextListSnippet(`
  listType="bullet"`)
    )
  )
