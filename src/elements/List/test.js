import List from '.'
import { ListItem } from '~/elements/List/ListItem'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

const items = [{ name: 'item 1', onClick: jest.fn() }, { name: 'item 2' }, { name: 'item 3' }]

describe('List', () => {
  const defaultProps = {
    grey: true,
    items,
    listHead: { name: 'List Head' },
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
    ).toEqual(items[0].name)
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
    const index = 0
    getListWrapper()
      .find(ListItem)
      .at(index)
      .simulate('click')
    expect(items[index].onClick).toBeCalled()
  })

  everyComponentTestSuite(getListWrapper, List, 'List')
})
