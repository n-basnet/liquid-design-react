import { prop } from 'ramda'
import naturalSort from 'javascript-natural-sort'

import Table from '.'
import TableContainer from '~/components/Table/TableContainer'
import { getSortingObject, SORT_MODES } from '~/components/Table/utils'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'
import { times } from '~/utils/misc'

describe('Table', () => {
  const rowsAmount = 5
  const colsAmount = 3

  const columns = times(colsAmount).map(col => {
    const header = `Column ${col}`
    return { header, accessor: prop(header) }
  })
  const rows = times(rowsAmount).map(rowIndex =>
    columns.reduce((acc, col) => ({ ...acc, [col.header]: `Row Content ${rowIndex}` }), {})
  )
  const defaultProps = { rows, columns }
  const getTableWrapper = getWrapper(Table, defaultProps)

  it('renders HTML table elements', () => {
    const wrapper = getTableWrapper()
    expect(wrapper.find('th').length).toBe(colsAmount)
    // two tables will be rendered so we need to look for the first one
    expect(
      wrapper
        .find('tbody')
        .first()
        .find('tr').length
    ).toBe(rowsAmount)
    expect(
      wrapper
        .find('tbody')
        .first()
        .find('td').length
    ).toBe(rowsAmount * colsAmount)

    expect(
      wrapper
        .find('tbody td')
        .first()
        .text()
    ).toBe(rows[0][columns[0].header])
  })

  it('handles row onChange callback', () => {
    const onChange = jest.fn()
    const copiedRow = rows[0]
    const wrapper = getTableWrapper({ columns, rows: [...rows, { ...copiedRow, onChange }] })
    wrapper
      .find('tbody')
      .first()
      .find('tr')
      .last()
      .simulate('click')
    expect(onChange.mock.calls[0][0]).toMatchObject({ rowState: {}, cells: copiedRow })
  })

  it('renders a selectable table', () => {
    const wrapper = getTableWrapper({ isSelectable: true })
    expect(wrapper.find('table').first().length).toBe(1)
  })

  describe('utils', () => {
    it('sort with naturalSort', () => {
      const data = [
        {
          stringValue: 'Text 1',
        },
        {
          stringValue: 'Text 2',
        },
        {
          stringValue: 'Text 0',
        },
      ]
      const dataSortedAscending = [
        {
          stringValue: 'Text 0',
        },
        {
          stringValue: 'Text 1',
        },
        {
          stringValue: 'Text 2',
        },
      ]
      const sortingObject = getSortingObject(naturalSort)
      expect(data.sort(sortingObject[SORT_MODES.ascending])).toEqual(dataSortedAscending)
      expect(data.sort(sortingObject[SORT_MODES.descending])).toEqual(dataSortedAscending.reverse())
    })
  })

  // because the component is wrapped in ReactResizeDetector, root HTML element will be TableContainer
  everyComponentTestSuite(getTableWrapper, TableContainer, 'Table')
})
