import React from 'react'
import { storiesOf } from '@storybook/react'

import { TextList } from '~'
import { getTextKnob } from '../helpers'

const getListItem = id => ({
  id,
  name: getTextKnob({
    name: `listItem ${id}`,
    defaultText: 'Lorem ipsum dolor sit amet',
  }),
})

const getData = () => [
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

storiesOf('Elements/TextList', module).add('numbered list', () => <TextList data={getData()} />)

storiesOf('Elements/TextList', module).add('bullet list', () => (
  <TextList data={getData()} listType='bullet' />
))
