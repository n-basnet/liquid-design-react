import List from '.'
import { ListItem } from '~/elements/List/ListItem'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

const items = ['item 1', 'item 2', 'item 3']

describe('List', () => {
  const defaultProps = {
    onClick: jest.fn(),
    grey: true,
    icon: 'star',
    items,
    activeItemIndex: 1,
    disabledItemIndex: 2,
  }
  const getListWrapper = getWrapper(List, defaultProps)

  it('renders an unordered list', () => {
    expect(getListWrapper().find('ul').length).toBeTruthy()
  })

  it('renders ListItems', () => {
    expect(getListWrapper().find(ListItem).length).toEqual(items.length)
    expect(
      getListWrapper()
        .find(ListItem)
        .first()
        .text()
    ).toEqual(items[0])
  })

  it('renders an active ListItem', () => {
    expect(
      getListWrapper()
        .find(ListItem)
        .get(defaultProps.activeItemIndex).props.active
    ).toBe(true)
  })

  it('renders a disabled ListItem', () => {
    expect(
      getListWrapper()
        .find(ListItem)
        .get(defaultProps.disabledItemIndex).props.disabled
    ).toBe(true)
  })

  it('calls a function when clicked', () => {
    getListWrapper()
      .find(ListItem)
      .first()
      .simulate('click')
    expect(defaultProps.onClick).toBeCalled()
  })

  everyComponentTestSuite(getListWrapper, List, 'List')
})
