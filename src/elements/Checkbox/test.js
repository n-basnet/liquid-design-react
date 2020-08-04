import Checkbox, { Label, Input } from '.'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'
import { Glyph } from '../Icon'

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
        .text(),
    ).toEqual(defaultProps.label)
  })

  it('toggles on click', () => {
    const wrapper = getCheckboxWrapper()
    expect(wrapper.find(Input).prop('checked')).toEqual(false)
    expect(
      wrapper
        .find(Glyph)
        .first()
        .prop('name'),
    ).toEqual('checkboxFilled')
    expect(
      wrapper
        .find(Glyph)
        .last()
        .prop('name'),
    ).toEqual('checkboxEmpty')
    expect(
      wrapper
        .find(Glyph)
        .first()
        .prop('style'),
    ).toHaveProperty('display', 'none')
    expect(
      wrapper
        .find(Glyph)
        .last()
        .prop('style'),
    ).not.toHaveProperty('display', 'none')
    wrapper.find(Checkbox).simulate('click')
    expect(wrapper.find(Input).prop('checked')).toEqual(true)
    expect(
      wrapper
        .find(Glyph)
        .first()
        .prop('style'),
    ).not.toHaveProperty('display', 'none')
    expect(
      wrapper
        .find(Glyph)
        .last()
        .prop('style'),
    ).toHaveProperty('display', 'none')
  })

  everyComponentTestSuite(getCheckboxWrapper, Checkbox, 'Checkbox')
})
