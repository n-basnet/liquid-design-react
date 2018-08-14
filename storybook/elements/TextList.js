import React from 'react'
import { storiesOf } from '@storybook/react'

import { TextList } from '~'
import { getTextKnob } from '../helpers'

const getListItem = () =>
  getTextKnob({ name: 'listItem', defaultText: 'Lorem ipsum dolor sit amet' })

const data = [
  {
    id: 1,
    name: getListItem(),
    items: [
      {
        id: 2,
        name: getListItem(),
        items: [
          {
            id: 3,
            name: getListItem(),
          },
        ],
      },
      {
        id: 4,
        name: getListItem(),
      },
    ],
  },
  {
    id: 5,
    name: getListItem(),
    items: [
      {
        id: 6,
        name: getListItem(),
        items: [
          {
            id: 7,
            name: getListItem(),
          },
          {
            id: 8,
            name: getListItem(),
          },
          {
            id: 9,
            name: getListItem(),
          },
        ],
      },
    ],
  },
  {
    id: 10,
    name: getListItem(),
  },
]

storiesOf('Elements/TextList', module).add('numbered list', () => (
  <TextList data={data} />
))

storiesOf('Elements/TextList', module).add('bullet list', () => (
  <TextList data={data} listType='bullet' />
))
