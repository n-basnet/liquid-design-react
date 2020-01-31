import DatePicker from '.'
import {
  toCommonFormat,
  getSeparator,
  getFormatRegexp,
  checkEndDateWithStartDate,
} from './utils'
import DATEPICKER_CONSTS from './consts'
import DayCell, { DayContainer } from '../Calendar/DayCell'
import TextField from '../../elements/TextField'
import Calendar from '../../modules/Calendar'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'

describe('DatePicker', () => {
  const defaultProps = {
    onStartDateChange: jest.fn(),
    format: DATEPICKER_CONSTS.DEFAULT_FORMAT,
  }
  const getDatePickerWrapper = getWrapper(DatePicker, defaultProps)

  it('renders datepicker', () => {
    const wrapper = getDatePickerWrapper()
    expect(wrapper).toBeTruthy()
  })
  it('has an autocomplete functionality', () => {
    const partOfDate = '12'
    const wrapper = getDatePickerWrapper()
    wrapper
      .find(TextField)
      .find('input')
      .simulate('change', { target: { value: partOfDate } })
    expect(wrapper.find(TextField).prop('value')).toBe('12 / ')
  })
  it('calls onStartDateChange prop if value is valid', () => {
    const wrapper = getDatePickerWrapper()
    const sampleStartDate = '12 / 10 / 2018'
    wrapper
      .find(TextField)
      .find('input')
      .simulate('change', { target: { value: sampleStartDate } })
    expect(defaultProps.onStartDateChange).toBeCalled()
  })
  it('has two inputs in range mode', () => {
    const wrapper = getDatePickerWrapper({ rangeMode: true })
    expect(wrapper.find(TextField)).toHaveLength(2)
  })
  it('renders Calendar in withCalendar mode', () => {
    const wrapper = getDatePickerWrapper({ withCalendar: true })
    expect(wrapper.find(Calendar)).toBeTruthy()
  })
  it('calls onStartDateChange prop if a date is selected in range/withCalendar mode', () => {
    const wrapper = getDatePickerWrapper({ withCalendar: true, rangeMode: true })
    wrapper
      .find(Calendar)
      .find(DayCell)
      .at(20)
      .find(DayContainer)
      .simulate('click')
    expect(defaultProps.onStartDateChange).toBeCalled()
  })

  everyComponentTestSuite(getDatePickerWrapper, DatePicker, 'DatePicker')
})

describe('DatePicker utils', () => {
  it('toCommonFormat', () => {
    const sampleInputDate = '12 / 03 / 2018'
    const sampleOutputDate = '2018-03-12'
    expect(
      toCommonFormat(sampleInputDate, DATEPICKER_CONSTS.DEFAULT_FORMAT, ' / '),
    ).toBe(sampleOutputDate)
  })
  it('getSeparator', () => {
    const sampleFormat = 'DD.MM.YYYY'
    expect(getSeparator(sampleFormat)).toBe('.')
  })
  it('getFormatRegexp', () => {
    const sampleFormat = 'DD.MM.YYYY'
    const sampleOutput = new RegExp(
      /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3}$/,
    )
    expect(getFormatRegexp(sampleFormat)).toEqual(sampleOutput)
  })
  it('checkEndDateWithStartDate', () => {
    const invalidFormattedEndDate = '2018-10-10'
    const validFormattedEndDate = '2018-10-20'
    const sampleStartDate = new Date(2018, 9, 15)
    const sampleStartDateInputValue = '15 / 10 / 2018'
    expect(
      checkEndDateWithStartDate(
        validFormattedEndDate,
        sampleStartDate,
        sampleStartDateInputValue,
        DATEPICKER_CONSTS.DEFAULT_FORMAT,
        DATEPICKER_CONSTS.END_DATE_ERROR_MESSAGE,
      ),
    ).toBe(true)
    expect(
      checkEndDateWithStartDate(
        invalidFormattedEndDate,
        sampleStartDate,
        sampleStartDateInputValue,
        DATEPICKER_CONSTS.DEFAULT_FORMAT,
        DATEPICKER_CONSTS.END_DATE_ERROR_MESSAGE,
      ),
    ).toBe(DATEPICKER_CONSTS.END_DATE_ERROR_MESSAGE)
  })
})
