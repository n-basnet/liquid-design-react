import TextField, { LabelWrapper } from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('TextField', () => {
  const defaultProps = {
    label: 'Some label',
    placeholder: 'Some placeholder',
  }
  const getTextFieldWrapper = getWrapper(TextField, defaultProps)
  it('renders an input with placeholder and label', () => {
    const wrapper = getTextFieldWrapper()
    expect(wrapper.find('input').prop('placeholder')).toEqual(defaultProps.placeholder)
    expect(wrapper.find(LabelWrapper).text()).toEqual(defaultProps.label)
  })
  it('renders a textarea if multiline prop is passed', () => {
    const wrapper = getTextFieldWrapper({ multiline: true })
    expect(wrapper.find('input').length).toEqual(0)
    expect(wrapper.find('textarea').length).toEqual(1)
  })
  it('assigns id and htmlFor attributes to input and label', () => {
    const wrapper = getTextFieldWrapper()
    expect(wrapper.find(LabelWrapper).prop('htmlFor')).toEqual(wrapper.find('input').prop('id'))
  })
  it('passes disabled prop', () => {
    const wrapper = getTextFieldWrapper({ disabled: true })
    expect(wrapper.find('input').prop('disabled')).toEqual(true)
  })

  everyComponentTestSuite(getTextFieldWrapper, TextField, 'TextField')
})
