import Dropdown, { DropdownTriggerWrapper } from '~/elements/Dropdown'
import { ResultWrapper } from '~/elements/Dropdown/OptionsGroup'
import Tag from '~/elements/Tag'
import { Input } from '~/elements/Checkbox'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Dropdown', () => {
  const onClick = jest.fn()
  const OPTIONS = [{ id: '1', name: 'Option 1', onClick }, { id: '2', name: 'Option 2' }]
  const defaultProps = {
    label: 'Dropdown label',
    options: OPTIONS,
  }
  const getDropdownWrapper = getWrapper(Dropdown, defaultProps)
  it('toggles options on click', () => {
    const wrapper = getDropdownWrapper()
    expect(wrapper.find(ResultWrapper).length).toEqual(0)
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    expect(wrapper.find(ResultWrapper).length).toEqual(OPTIONS.length)
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    expect(wrapper.find(ResultWrapper).length).toEqual(0)
  })
  it('handles option click', () => {
    const wrapper = getDropdownWrapper()
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    wrapper
      .find(ResultWrapper)
      .first()
      .simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
  it('handles multiselect', () => {
    const optionIndex = 0
    const props = { multiselect: true, selectedOptionsIds: [OPTIONS[optionIndex].id] }
    const wrapper = getDropdownWrapper(props)
    expect(wrapper.find(Tag).length).toEqual(props.selectedOptionsIds.length)
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    expect(
      wrapper
        .find(Input)
        .at(optionIndex)
        .prop('checked')
    ).toEqual(true)
  })

  everyComponentTestSuite(getDropdownWrapper, Dropdown, 'Dropdown')
})
