import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import dateFns from 'date-fns'
import cx from 'classnames'
import enhanceWithClickOutside from 'react-click-outside'

import { toCommonFormat, getFormatRegexp, getSeparator, checkEndDateWithStartDate } from './utils'
import { CalendarContainer, DatePickerWrapper, InputWrapper } from './DatePickerParts'
import DATEPICKER_CONSTS from './consts'
import Calendar from '~/modules/Calendar'
import TextField from '~/elements/TextField'
import { Glyph } from '~/elements/Icon'
import { getClassName } from '~/components/aux/hoc/attachClassName'
import { FORMATS, YEAR_FORMAT_REGEXP } from '~/utils/consts/dates'

const today = new Date()
export class DatePicker extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    withCalendar: PropTypes.bool,
    rangeMode: PropTypes.bool,
    /**  provides a default start date in a range mode or single date in single mode */
    defaultStartDate: PropTypes.instanceOf(Date),
    /**  provides a default end date in a range mode */
    defaultEndDate: PropTypes.instanceOf(Date),
    /**
     * provides a desired format of date string in input. Supported formats:
     * 'DD / MM / YYYY',
     * 'MM / DD / YYYY',
     * 'DD.MM.YYYY',
     * 'MM.DD.YYYY',
     * 'DD-MM-YYYY',
     * 'MM-DD-YYYY'
     */
    format: PropTypes.oneOf(DATEPICKER_CONSTS.POSSIBLE_FORMATS),
    startDateLabel: PropTypes.string,
    endDateLabel: PropTypes.string,
    /** handler for start date change in range mode or single date in single mode */
    onStartDateChange: PropTypes.func,
    /** handler for end date change in range mode */
    onEndDateChange: PropTypes.func,
    className: PropTypes.string,
    /** object for additional props passed to calendar like className or desired first day of week */
    calendarProps: PropTypes.object,
    /** error message which is shown when input value didn't pass validation */
    dateValidationError: PropTypes.string,
    /** error message which is shown when end date input value is not after the start date value */
    endDateValidationError: PropTypes.string,
  }
  static defaultProps = {
    disabled: false,
    withCalendar: false,
    rangeMode: false,
    defaultStartDate: null,
    defaultEndDate: null,
    format: DATEPICKER_CONSTS.DEFAULT_FORMAT,
    startDateLabel: 'Start Date',
    endDateLabel: 'End Date',
    onStartDateChange: () => {},
    onEndDateChange: () => {},
    className: null,
    calendarProps: {},
    dateValidationError: DATEPICKER_CONSTS.DATE_FORMAT_ERROR_MESSAGE,
    endDateValidationError: DATEPICKER_CONSTS.END_DATE_ERROR_MESSAGE,
  }

  state = {
    startDate: this.props.defaultStartDate,
    endDate: this.props.defaultEndDate,
    startDateInputValue: this.props.defaultStartDate
      ? dateFns.format(this.props.defaultStartDate, this.props.format)
      : '',
    endDateInputValue: this.props.defaultEndDate
      ? dateFns.format(this.props.defaultEndDate, this.props.format)
      : '',
    formatSeparator: null,
    formatRegExp: null,
    startDateWasInUse: false,
    endDateWasInUse: false,
    isCalendarOpen: false,
    isSelectingRange: false,
    currentMonth: this.props.defaultStartDate || today,
    calendarYear: this.props.defaultStartDate
      ? dateFns.format(this.props.defaultStartDate, 'YYYY')
      : dateFns.format(today, 'YYYY'),
  }
  componentDidMount() {
    const { format } = this.props
    const currentSeparator = getSeparator(format)
    const formatRegexp = getFormatRegexp(format)
    this.setState({
      formatSeparator: currentSeparator,
      formatRegExp: formatRegexp,
    })
  }
  changeCurrentMonth = date => {
    this.setState({ currentMonth: date, calendarYear: dateFns.format(date, 'YYYY') })
  }
  changeCalendarYear = value => {
    this.setState({ calendarYear: value })
    if (value.match(YEAR_FORMAT_REGEXP)) {
      this.setState(({ currentMonth }) => ({ currentMonth: dateFns.setYear(currentMonth, value) }))
    }
  }
  blurCalendarYear = () => {
    const { calendarYear, currentMonth } = this.state
    if (!calendarYear.match(YEAR_FORMAT_REGEXP)) {
      this.setState({ calendarYear: dateFns.format(currentMonth, FORMATS.YEAR_FORMAT) })
    }
  }
  validateStartDate = value => {
    if (!this.state.startDateWasInUse) return true
    return this.commonInputValidate(value)
  }
  validateEndDate = value => {
    const { startDate, startDateInputValue, endDateWasInUse, formatSeparator } = this.state
    const { format, endDateValidationError } = this.props
    if (!endDateWasInUse) return true
    const formattedValue = toCommonFormat(value, format, formatSeparator)
    return this.commonInputValidate(value) === true
      ? checkEndDateWithStartDate(
        formattedValue,
        startDate,
        startDateInputValue,
        format,
        endDateValidationError
      )
      : this.commonInputValidate(value)
  }
  commonInputValidate = value => {
    return value.match(this.state.formatRegExp) &&
      dateFns.isValid(
        dateFns.parse(toCommonFormat(value, this.props.format, this.state.formatSeparator))
      )
      ? true
      : this.props.dateValidationError
  }
  handleClickOutside = () => {
    this.setState(({ startDate }) => ({
      isCalendarOpen: false,
      currentMonth: startDate || today,
    }))
  }
  handleInputChange = (value, valueName) => {
    const { formatSeparator, endDate } = this.state
    const { format, rangeMode } = this.props
    const firstSeparatorPosition = 2
    const secondSeparatorPosition =
      firstSeparatorPosition + formatSeparator.length + firstSeparatorPosition
    const isStartDateInput = valueName === 'startDateInputValue'
    if (
      (value.length === firstSeparatorPosition || value.length === secondSeparatorPosition) &&
      value.length > this.state[valueName].length
    ) {
      value = `${value}${formatSeparator}`
    }
    this.setState({ [valueName]: value })
    if (value.length === format.length && this.commonInputValidate(value) === true) {
      const parsedValue = dateFns.parse(toCommonFormat(value, format, this.state.formatSeparator))
      this.setState({
        [isStartDateInput ? 'startDate' : 'endDate']: parsedValue,
        isSelectingRange:
          rangeMode && isStartDateInput && (!endDate || dateFns.isAfter(parsedValue, endDate)),
      })
      if (isStartDateInput && dateFns.isAfter(parsedValue, endDate)) {
        this.setState({
          endDate: null,
          endDateInputValue: '',
        })
      }
      if (isStartDateInput) {
        this.setState({
          currentMonth: parsedValue,
          calendarYear: dateFns.format(parsedValue, FORMATS.YEAR_FORMAT),
        })
      }
      if (!isStartDateInput || !rangeMode) {
        this.setState({ isCalendarOpen: false })
      }
      isStartDateInput
        ? this.props.onStartDateChange(parsedValue)
        : this.props.onEndDateChange(parsedValue)
    }
  }
  handleStartDateChange = date => {
    this.handleInputChange(date, 'startDateInputValue')
  }
  handleEndDateChange = date => {
    this.handleInputChange(date, 'endDateInputValue')
  }

  handleStartSelectFromCalendar = date => {
    this.setState({
      startDate: date,
      startDateInputValue: dateFns.format(date, this.props.format),
      currentMonth: date,
    })
    if (this.props.rangeMode) {
      this.setState({ isSelectingRange: true })
    } else {
      this.setState({ isCalendarOpen: false })
    }
  }
  handleEndSelectFromCalendar = date => {
    this.setState({
      endDate: date,
      endDateInputValue: date ? dateFns.format(date, this.props.format) : '',
      isCalendarOpen: !date,
      isSelectingRange: !date,
    })
  }
  handleStartDateBlur = () => this.setState({ startDateWasInUse: true })
  handleEndDateBlur = () => this.setState({ endDateWasInUse: true })
  openCalendar = () => {
    if (this.props.withCalendar) {
      this.setState({ isCalendarOpen: true })
    }
  }
  toggleCalendar = () => {
    const { withCalendar, disabled } = this.props
    if (withCalendar && !disabled) {
      this.setState(({ isCalendarOpen }) => ({ isCalendarOpen: !isCalendarOpen }))
    }
  }

  render() {
    const {
      className,
      format,
      startDateLabel,
      disabled,
      endDateLabel,
      withCalendar,
      rangeMode,
      calendarProps,
      ...props
    } = this.props
    const {
      startDateInputValue,
      endDateInputValue,
      isCalendarOpen,
      startDate,
      endDate,
      isSelectingRange,
      currentMonth,
      calendarYear,
    } = this.state
    const textFieldPlaceholder = format.toLowerCase()
    return (
      <DatePickerWrapper className={cx(DATE_PICKER_CLASSNAMES.BASE, className)} {...props}>
        <InputWrapper disabled={disabled} className={DATE_PICKER_CLASSNAMES.INPUT_WRAPPER}>
          <TextField
            grey
            placeholder={textFieldPlaceholder}
            label={startDateLabel}
            value={startDateInputValue}
            onChange={this.handleStartDateChange}
            disabled={disabled}
            validate={this.validateStartDate}
            onBlur={this.handleStartDateBlur}
            onFocus={this.openCalendar}
          />
          {rangeMode ? (
            <TextField
              grey
              placeholder={textFieldPlaceholder}
              label={endDateLabel}
              value={endDateInputValue}
              onChange={this.handleEndDateChange}
              disabled={disabled}
              validate={this.validateEndDate}
              onBlur={this.handleEndDateBlur}
              onFocus={this.openCalendar}
            />
          ) : null}
          {withCalendar ? (
            <Glyph
              name='calendar'
              size={18}
              color={disabled ? 'sensitiveGrey.darker' : undefined}
              onClick={this.toggleCalendar}
            />
          ) : null}
        </InputWrapper>
        {withCalendar ? (
          <CalendarContainer
            isOpen={isCalendarOpen}
            className={DATE_PICKER_CLASSNAMES.CALENDAR_CONTAINER}
          >
            <Calendar
              onStartDateSelect={this.handleStartSelectFromCalendar}
              onEndDateSelect={this.handleEndSelectFromCalendar}
              selectedStartDate={startDate}
              selectedEndDate={endDate}
              isSelectingRange={isSelectingRange}
              rangeMode={rangeMode}
              currentMonth={currentMonth}
              changeCurrentMonth={this.changeCurrentMonth}
              yearInputValue={calendarYear}
              changeYearInputValue={this.changeCalendarYear}
              blurYearInput={this.blurCalendarYear}
              {...calendarProps}
            />
          </CalendarContainer>
        ) : null}
      </DatePickerWrapper>
    )
  }
}

const classNameBase = getClassName(DatePicker)
export const DATE_PICKER_CLASSNAMES = {
  BASE: classNameBase,
  INPUT_WRAPPER: `${classNameBase}__Input`,
  CALENDAR_CONTAINER: `${classNameBase}__Calendar`,
}

export default enhanceWithClickOutside(DatePicker)
