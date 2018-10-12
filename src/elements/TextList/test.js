import TextList from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

const name = 'Lorem ipsum dolor sit amet'

const defaultProps = {
  items: [
    {
      name,
      items: [
        {
          name,
          items: [
            {
              name,
            },
          ],
        },
        {
          name,
        },
      ],
    },
    {
      name,
    },
  ],
}

const getTextListWrapper = getWrapper(TextList, defaultProps)

describe('Bullet List', () => {
  const wrapper = getTextListWrapper({ listType: 'bullet' })

  it('renders a Bullet List', () => {
    expect(wrapper.find('ul').length).toBeGreaterThan(1)
  })
})

describe('Numbered List', () => {
  const wrapper = getTextListWrapper({ listType: 'numbered' })

  it('renders a Numbered List', () => {
    expect(wrapper.find('ol').length).toBeGreaterThan(1)
  })
})

describe('TextList', () => {
  everyComponentTestSuite(getTextListWrapper, TextList, 'TextList')
})
