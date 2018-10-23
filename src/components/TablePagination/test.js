import TablePagination from '.'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'

describe('TablePagination', () => {
  const defaultProps = {
    itemsCount: 300,
    itemsPerPageAmount: 15,
    currentPage: 1,
    onChange: jest.fn(),
  }
  const getTablePaginationWrapper = getWrapper(TablePagination, defaultProps)

  it('renders correct text', () => {
    const wrapper = getTablePaginationWrapper()
    const { currentPage, itemsCount, itemsPerPageAmount } = defaultProps
    const expectedPagesString = `${currentPage} of ${itemsCount / itemsPerPageAmount} pages`
    const expectedItemsString = `${currentPage}-${itemsPerPageAmount * currentPage} of ${
      defaultProps.itemsCount
    } items`

    expect(wrapper.find(TablePagination).text()).toMatch(expectedPagesString)
    expect(wrapper.find(TablePagination).text()).toMatch(expectedItemsString)
  })

  it('handles current page update', () => {
    const wrapper = getTablePaginationWrapper()
    const updatedPageIndex = defaultProps.currentPage + 1

    const increaseButton = wrapper.find('[data-test-value="increaseCurrentPage"]')
    increaseButton.simulate('click')

    expect(defaultProps.onChange).toHaveBeenLastCalledWith(updatedPageIndex)
  })

  everyComponentTestSuite(getTablePaginationWrapper, TablePagination, 'TablePagination')
})
