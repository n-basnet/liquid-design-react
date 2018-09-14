import Icon from '~/elements/Icon'
import Tag from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Tag', () => {
  const defaultProps = {
    label: 'Tag',
    onIconClick: jest.fn(),
  }
  const getTagWrapper = getWrapper(Tag, defaultProps)

  it('renders label', () => {
    expect(
      getTagWrapper()
        .find(Tag)
        .text()
    ).toMatch(defaultProps.label)
  })

  it('renders a "close" icon by default', () => {
    expect(
      getTagWrapper()
        .find(Icon)
        .prop('name')
    ).toEqual('close')
  })

  it('handles icon click event', () => {
    getTagWrapper()
      .find(Icon)
      .simulate('click')
    expect(defaultProps.onIconClick).toBeCalled()
  })

  everyComponentTestSuite(getTagWrapper, Tag, 'Tag')
})
