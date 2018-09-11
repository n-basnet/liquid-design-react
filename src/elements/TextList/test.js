import TextList from '.'
import { BulletList } from '~/elements/TextList/BulletList'
import { NumberedList } from '~/elements/TextList/NumberedList'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

const name = 'Lorem ipsum dolor sit amet'

const defaultProps = {
  items: [
    {
      id: 1,
      name,
      items: [
        {
          id: 2,
          name,
          items: [
            {
              id: 3,
              name,
            },
          ],
        },
        {
          id: 4,
          name,
        },
      ],
    },
    {
      id: 5,
      name,
    },
  ],
}

const getTextListWrapper = getWrapper(TextList, defaultProps)

describe('Bullet List', () => {
  const wrapper = getTextListWrapper({ bullet: true })

  it('renders a Bullet List', () => {
    expect(wrapper.find(BulletList)).toBeTruthy()
  })
})

describe('Numbered List', () => {
  const wrapper = getTextListWrapper({ numbered: true })

  it('renders a Numbered List', () => {
    expect(wrapper.find(NumberedList)).toBeTruthy()
  })
})

describe('TextList', () => {
  everyComponentTestSuite(getTextListWrapper, TextList, 'TextList')
})
