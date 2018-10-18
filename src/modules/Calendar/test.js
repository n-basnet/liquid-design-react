import Calendar, { IconWrapper, MonthName, WeekDay } from '.'
import DayCell, { DayContainer } from './DayCell'
import TextField from '~/elements/TextField'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'

describe('Calendar', () => {
  const defaultProps = {
    selectedStartDate: new Date(2018, 10, 10),
    onStartDateSelect: jest.fn(),
  }
  const getCalendarWrapper = getWrapper(Calendar, defaultProps)
  it('renders calendar', () => {
    const wrapper = getCalendarWrapper()
    expect(wrapper).toBeTruthy()
  })
  it('renders correct month', () => {
    const wrapper = getCalendarWrapper()
    expect(wrapper.find(MonthName).text()).toBe('Nov')
  })
  it('renders calendar with weeks starting from specified day if it provided', () => {
    const wrapper = getCalendarWrapper({ startOfWeek: 1 })
    expect(
      wrapper
        .find(WeekDay)
        .at(0)
        .text()
    ).toBe('Mon')
  })
  it('changes the month', () => {
    const wrapper = getCalendarWrapper()
    wrapper
      .find(IconWrapper)
      .at(0)
      .simulate('click')
    expect(wrapper.find(MonthName).text()).toBe('Oct')
    expect(
      wrapper
        .find(DayCell)
        .at(0)
        .text()
    ).toEqual('30')
  })
  it('renders correct year', () => {
    const wrapper = getCalendarWrapper()
    expect(wrapper.find(TextField).prop('value')).toBe('2018')
  })
  it('changes the year if passed value is 4 digits', () => {
    const wrapper = getCalendarWrapper()
    const validYear = '2017'
    wrapper
      .find(TextField)
      .find('input')
      .simulate('change', { target: { value: validYear } })
    expect(
      wrapper
        .find(DayCell)
        .at(0)
        .text()
    ).toBe('29')
  })
  it('does not change a year if passed value is not 4 digits', () => {
    const wrapper = getCalendarWrapper()
    const invalidYear = 'abc'
    wrapper
      .find(TextField)
      .find('input')
      .simulate('change', { target: { value: invalidYear } })
    wrapper
      .find(TextField)
      .find('input')
      .simulate('blur')
    expect(wrapper.find(TextField).prop('value')).toBe('2018')
    expect(
      wrapper
        .find(DayCell)
        .at(0)
        .text()
    ).toBe('28')
  })
  it('allows to select date', () => {
    let defaultDate = new Date(2018, 10, 10)
    const changeDate = jest.fn(date => (defaultDate = date))
    const wrapper = getCalendarWrapper({
      selectedStartDate: defaultDate,
      onStartDateSelect: changeDate,
    })
    wrapper
      .find(DayCell)
      .at(20)
      .find(DayContainer)
      .simulate('click')
    expect(defaultDate).toEqual(new Date(2018, 10, 17))
  })
  it('handles onStartDateSelect prop', () => {
    const wrapper = getCalendarWrapper()
    wrapper
      .find(DayCell)
      .at(20)
      .find(DayContainer)
      .simulate('click')
    expect(defaultProps.onStartDateSelect).toBeCalled()
  })
  it('allows to select range', () => {
    let defaultStartDate = new Date(2018, 10, 10)
    let defaultEndDate = new Date(2018, 10, 10)
    const changeStartDate = jest.fn(date => (defaultStartDate = date))
    const changeEndDate = jest.fn(date => (defaultEndDate = date))
    const wrapper = getCalendarWrapper({
      selectedStartDate: defaultStartDate,
      selectedEndDate: defaultEndDate,
      onStartDateSelect: changeStartDate,
      onEndDateSelect: changeEndDate,
      rangeMode: true,
    })
    wrapper
      .find(DayCell)
      .at(20)
      .find(DayContainer)
      .simulate('click')
    wrapper
      .find(DayCell)
      .at(23)
      .find(DayContainer)
      .simulate('click')
    expect(defaultStartDate).toEqual(new Date(2018, 10, 17))
    expect(defaultEndDate).toEqual(new Date(2018, 10, 20))
  })
  everyComponentTestSuite(getCalendarWrapper, Calendar, 'Calendar')
})
