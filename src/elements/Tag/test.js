import Icon from '~/elements/Icon'
import Tag from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Tag', () => {
  const defaultProps = {
    label: 'Tag',
    onClick: jest.fn(),
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

  it('handles a click event', () => {
    getTagWrapper()
      .find(Icon)
      .simulate('click')
    expect(defaultProps.onClick).toBeCalled()
  })

  everyComponentTestSuite(getTagWrapper, Tag, 'Tag')
})
