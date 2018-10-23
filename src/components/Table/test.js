import Table from '.'
import TableContainer from '~/components/Table/TableContainer'
import { getCellsAndRowInfo, sort, SORT_MODES } from '~/components/Table/utils'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'
import { times } from '~/utils/aux'

// unfortunately sorting can't be tested because it relies on .innerText, which is not supported in jsdom

describe('Table', () => {
  const rowsAmount = 5
  const colsAmount = 3
  const rows = times(rowsAmount).map(row => times(colsAmount).map(col => `Row Content ${row}`))
  const columns = times(colsAmount).map(col => `Column Name ${col}`)
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
    ).toBe(rows[0][0])
  })

  it('handles row onChange callback', () => {
    const onChange = jest.fn()
    const wrapper = getTableWrapper({ columns, rows: [...rows, [...rows[0], { onChange }]] })
    wrapper
      .find('tbody')
      .first()
      .find('tr')
      .last()
      .simulate('click')
    expect(onChange.mock.calls[0][0]).toMatchObject({ rowState: {}, rowConfig: {} })
  })

  it('renders a selectable table', () => {
    const wrapper = getTableWrapper({ isSelectable: true })
    expect(wrapper.find('table').first().length).toBe(1)
  })

  describe('utils', () => {
    it('getCellsAndRowInfo', () => {
      const configCell = {
        onChange: jest.fn(),
      }
      const stringCells = ['Some cell content 0', 'Some cell content 1']
      const { cells, rowConfigCell } = getCellsAndRowInfo([...stringCells, configCell])
      expect(cells).toEqual(stringCells)
      expect(rowConfigCell).toEqual(configCell)

      expect(getCellsAndRowInfo(cells)).toEqual({ cells: stringCells, rowConfigCell: undefined })
      expect(getCellsAndRowInfo([])).toEqual({ cells: [], rowConfigCell: undefined })
    })

    it('sort', () => {
      const data = [
        {
          text: 'Text 1',
        },
        {
          text: 'Text 2',
        },
        {
          text: 'Text 0',
        },
      ]
      const dataSortedAscending = [
        {
          text: 'Text 0',
        },
        {
          text: 'Text 1',
        },
        {
          text: 'Text 2',
        },
      ]
      expect(data.sort(sort[SORT_MODES.ascending])).toEqual(dataSortedAscending)
      expect(data.sort(sort[SORT_MODES.descending])).toEqual(dataSortedAscending.reverse())
    })
  })

  // because the component is wrapped in ReactResizeDetector, root HTML element will be TableContainer
  everyComponentTestSuite(getTableWrapper, TableContainer, 'Table')
})
