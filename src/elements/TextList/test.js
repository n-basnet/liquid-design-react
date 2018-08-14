import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import TextList from '.'
import { BulletList } from '~/elements/TextList/BulletList'
import { NumberedList } from '~/elements/TextList/NumberedList'

const data = [
  {
    id: 1,
    name: 'Lorem ipsum dolor sit amet',
    items: [
      {
        id: 2,
        name: 'Lorem ipsum dolor sit amet',
        items: [
          {
            id: 3,
            name: 'Lorem ipsum dolor sit amet',
          },
        ],
      },
      {
        id: 4,
        name: 'Lorem ipsum dolor sit amet',
      },
    ],
  },
  {
    id: 5,
    name: 'Lorem ipsum dolor sit amet',
  },
]

describe('Bullet List', () => {
  const wrapper = shallow(<TextList data={data} bullet />)

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Bullet List', () => {
    expect(wrapper.find(BulletList)).toBeTruthy()
  })
})

describe('Numbered List', () => {
  const wrapper = shallow(<TextList data={data} numbered />)
  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Numbered List', () => {
    expect(wrapper.find(NumberedList)).toBeTruthy()
  })
})
