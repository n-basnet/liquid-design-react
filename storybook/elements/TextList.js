import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getTextKnob,
  getSnippetTemplate,
  getBackgroundWrapper,
  getPropTablesExcludeList,
} from '../helpers'
import EnhancedTextList, { TextList } from '../../src/elements/TextList'

const getListItem = id => ({
  name: getTextKnob({
    name: `listItem ${id}`,
    defaultText: 'Lorem ipsum dolor sit amet',
  }),
})

const getItems = () => [
  {
    ...getListItem(),
    items: [
      {
        ...getListItem(),
        items: [getListItem()],
      },
      getListItem(),
    ],
  },
  {
    ...getListItem(),
    items: [
      {
        ...getListItem(),
        items: [getListItem(), getListItem(), getListItem()],
      },
    ],
  },
  {
    ...getListItem(),
  },
]

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedTextList]),
    propTables: [TextList],
  },
}

const getDefaultProps = () => ({
  items: getItems(),
})

const getTextListSnippet = props => `
  <TextList
    items={[
      { name: 'Lorem ipsum dolor sit amet' },
      {
        name: 'Lorem ipsum dolor sit amet',
        items: [
          { name: 'Lorem ipsum dolor sit amet' },
          { name: 'Lorem ipsum dolor sit amet' },
          { name: 'Lorem ipsum dolor sit amet' },
        ]
      },
    ]}
  />
`

storiesOf('Elements/TextList', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(params)
  .add(
    'numbered list',
    () => <EnhancedTextList {...getDefaultProps()} />,
    getSnippetTemplate(getTextListSnippet()),
  )
  .add(
    'bullet list',
    () => <EnhancedTextList {...getDefaultProps()} listType="bullet" />,
    getSnippetTemplate(
      getTextListSnippet(`
  listType="bullet"`),
    ),
  )
