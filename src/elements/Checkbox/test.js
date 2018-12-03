import Checkbox, { Label, Input } from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'
import { Glyph } from '~/elements/Icon'

describe('Checkbox', () => {
  const defaultProps = {
    label: 'Checkbox text',
    onChange: jest.fn(),
  }
  const getCheckboxWrapper = getWrapper(Checkbox, defaultProps)

  it('renders the label', () => {
    expect(
      getCheckboxWrapper()
        .find(Label)
        .text()
    ).toEqual(defaultProps.label)
  })

  it('toggles on click', () => {
    const wrapper = getCheckboxWrapper()
    expect(wrapper.find(Input).prop('checked')).toEqual(false)
    expect(wrapper.find(Glyph).prop('name')).toEqual('checkboxEmpty')
    wrapper.find(Checkbox).simulate('click')
    expect(wrapper.find(Input).prop('checked')).toEqual(true)
    expect(wrapper.find(Glyph).prop('name')).toEqual('checkboxFilled')
    wrapper.find(Checkbox).simulate('click')
    expect(wrapper.find(Input).prop('checked')).toEqual(false)
    expect(wrapper.find(Glyph).prop('name')).toEqual('checkboxEmpty')
  })

  everyComponentTestSuite(getCheckboxWrapper, Checkbox, 'Checkbox')
})
