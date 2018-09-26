import Calendar, { IconWrapper, MonthName, WeekDay } from '.'
import DayCell, { DayContainer } from './DayCell'
import TextField from '~/elements/TextField'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'

describe('Calendar', () => {
  const defaultProps = {
    defaultSelectedDate: new Date(2018, 10, 10),
    onSelect: jest.fn(),
  }
  const getCalendarWrapper = getWrapper(Calendar, defaultProps)
  it('renders calendar', () => {
    const wrapper = getCalendarWrapper()
    expect(wrapper).toBeTruthy()
  })
  it('renders correct month', () => {
    const wrapper = getCalendarWrapper()
    expect(wrapper.find(MonthName).text()).toEqual('Nov')
  })
  it('renders calendar with weeks starting from specified day if it provided', () => {
    const wrapper = getCalendarWrapper({ startOfWeek: 1 })
    expect(
      wrapper
        .find(WeekDay)
        .at(0)
        .text()
    ).toEqual('Mon')
  })
  it('changes the month', () => {
    const wrapper = getCalendarWrapper()
    wrapper
      .find(IconWrapper)
      .at(0)
      .simulate('click')
    expect(wrapper.find(MonthName).text()).toEqual('Oct')
    expect(
      wrapper
        .find(DayCell)
        .at(0)
        .text()
    ).toEqual('30')
  })
  it('renders correct year', () => {
    const wrapper = getCalendarWrapper()
    expect(wrapper.find(TextField).prop('value')).toEqual('2018')
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
    ).toEqual('29')
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
    expect(wrapper.find(TextField).prop('value')).toEqual('2018')
    expect(
      wrapper
        .find(DayCell)
        .at(0)
        .text()
    ).toEqual('28')
  })
  it('allows to select date', () => {
    const wrapper = getCalendarWrapper()
    wrapper
      .find(DayCell)
      .at(20)
      .find(DayContainer)
      .simulate('click')
    expect(
      wrapper
        .find(DayCell)
        .at(20)
        .prop('isSelected')
    ).toEqual(true)
  })
  it('handles onSelect prop', () => {
    const wrapper = getCalendarWrapper()
    wrapper
      .find(DayCell)
      .at(20)
      .find(DayContainer)
      .simulate('click')
    expect(defaultProps.onSelect).toBeCalled()
  })
  everyComponentTestSuite(getCalendarWrapper, Calendar, 'Calendar')
})
