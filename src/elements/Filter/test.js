import Filter from '../../elements/Filter'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'
import DropdownProvider from '../../elements/misc/DropdownProvider'
import { Glyph } from '../../elements/Icon'

describe('Filter', () => {
  const OPTIONS = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
  ]
  const defaultProps = {
    label: 'Filter Label',
    options: OPTIONS,
  }

  const getFilterWrapper = getWrapper(Filter, defaultProps)

  it('should display filter icon properly', () => {
    const wrapper = getFilterWrapper()
    expect(wrapper.find(Glyph).length).toEqual(1)
    expect(wrapper.find(Glyph).prop('name')).toEqual('filter')
  })

  it('should pass default props properly', () => {
    const wrapper = getFilterWrapper()
    expect(wrapper.find(DropdownProvider).prop('label')).toEqual('Filter Label')
    expect(wrapper.find(DropdownProvider).prop('options')).toEqual(OPTIONS)
  })

  it('always pass `inline` prop', () => {
    const wrapper = getFilterWrapper()
    expect(wrapper.find(DropdownProvider).prop('inline')).toEqual(true)
  })

  it('always passes `nameForClassName` prop equal `Filter`', () => {
    const wrapper = getFilterWrapper()
    expect(wrapper.find(DropdownProvider).prop('nameForClassName')).toEqual(
      'Filter',
    )
  })

  everyComponentTestSuite(getFilterWrapper, Filter, 'Filter')
})
