import Dropdown from '~/elements/Dropdown'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'
import DropdownProvider from '~/elements/misc/DropdownProvider'
import { Glyph } from '~/elements/Icon'

describe('Dropdown', () => {
  const OPTIONS = [{ id: '1', name: 'Option 1' }, { id: '2', name: 'Option 2' }]
  const defaultProps = {
    label: 'Dropdown label',
    options: OPTIONS,
  }

  const getDropdownWrapper = getWrapper(Dropdown, defaultProps)

  it('should display arrowTop icon properly', () => {
    const wrapper = getDropdownWrapper()
    expect(wrapper.find(Glyph).length).toEqual(1)
    expect(wrapper.find(Glyph).prop('name')).toEqual('arrowTop')
  })

  it('should pass default props properly', () => {
    const wrapper = getDropdownWrapper()
    expect(wrapper.find(DropdownProvider).prop('label')).toEqual('Dropdown label')
    expect(wrapper.find(DropdownProvider).prop('options')).toEqual(OPTIONS)
  })

  everyComponentTestSuite(getDropdownWrapper, Dropdown, 'Dropdown')
})
