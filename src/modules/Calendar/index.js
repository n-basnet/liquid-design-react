import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import dateFns from 'date-fns'
import { isEmpty, isNil, find } from 'ramda'

import { times } from '../../utils/misc'
import { FORMATS, YEAR_FORMAT_REGEXP } from '../../utils/consts/dates'
import { media } from '../../utils/styling'
import { Glyph } from '../../elements/Icon'
import TextField, { TEXT_FIELD_CLASSNAMES } from '../../elements/TextField'
import DayCell from '../../modules/Calendar/DayCell'
import { INPUT_SINGLELINE_CLASSNAME } from '../../components/misc/Input'
import { isTouchDevice } from '../../utils/featureDetects'
import attachClassName, {
  getClassName,
} from '../../components/misc/hoc/attachClassName'

export const YEAR_INPUT_CLASSNAME = getClassName({ name: 'YearInput' })

const CalendarWrapper = styled.section`
  width: 400px;
  padding: 20px 17px 13px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04), 0 11px 14px rgba(0, 0, 0, 0.04);
  ${props => css`
    background-color: ${props.theme.colors.white.base};
    border-radius: ${props.theme.borderRadius};
  `};
  ${media.max.phone`
    width: 280px;
    padding: 6px;
    padding-bottom: 11px;
  `};
`
const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34.6px;
  margin: 7.6px -1px 3.4px 2px;
  ${media.max.phone`
    margin: 11.6px 8px 3.4px 7.4px;;
    height: 24px;
  `};
`
export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  margin-top: -3px;
  cursor: pointer;
`
export const MonthName = styled.div`
  width: 35px;
  margin-right: 12px;
  line-height: 1.75;
  font-size: 16px;
  ${media.max.phone`
  width: 27px;
  margin-right: 7px;
  line-height: 1.25;
  font-size: 12px;
  `};
`

const MonthYearWrapper = styled.div`
  display: flex;
  margin-left: 4px;
  height: 100%;
  ${media.max.phone`
    margin-left: 1px;
    align-items: center;
  `};
  .${TEXT_FIELD_CLASSNAMES.BASE} {
    margin-bottom: 0px;
    margin-top: -1px;
    height: 100%;
    ${media.max.phone`
    margin-top: 0;
    `};
  }
  .${YEAR_INPUT_CLASSNAME} {
    ${props => css`
      font-weight: ${props.theme.fontWeight.black};
      background-color: ${props.theme.colors.sensitiveGrey.base};
    `};
    font-size: 16px;
    line-height: 1.25;
    width: 60.8px;
    height: 100%;
    border-radius: 8.6px;

    ${media.max.phone`
      width: 42.3px;
      letter-spacing: 0.2px
      line-height: 1.25;
      font-size: 12px;
    `};
    .${INPUT_SINGLELINE_CLASSNAME} {
      padding: 6.7px 7.6px 5.7px 10px;
      transition: none;
      ${media.max.phone`
      padding: 3px 7.6px 5.7px 6px;
      `};
    }
  }
`

const WeekDaysRow = styled.div`
  margin: 17px 0 23px 0;
  ${media.max.phone`
    margin: 11px 0 6px;
    padding-left: 14px;
  `};
`
export const WeekDay = styled.div`
  display: inline-block;
  width: 50px;
  padding: 0 10.5px;
  font-size: 12px;
  line-height: 1.25;
  letter-spacing: 0.2px;
  margin-right: 3.4px;
  &:last-child {
    margin-right: 0;
    padding-right: 0;
    width: 40px;
  }
  ${media.max.phone`
    font-size: 10px;
    line-height: 1.5;
    padding: 0;
    width: 33.5px;
    &:last-child {
      width: 30px;
    }
  `};
  ${props => css`
    color: ${props.theme.colors.primary.base};
  `};
`
const DaysRow = styled.div`
  margin: 12.4px 0;
  ${media.max.phone`
    margin: 6.8px 0;
    margin-left: 7px;
  `};
`

export class Calendar extends PureComponent {
  static propTypes = {
    /** start date in range mode and single date in single mode. Should be passed from containing component even if first value is null */
    selectedStartDate: PropTypes.instanceOf(Date),
    /** end date in a range mode. Should be passed from containing component even if first value is null when range mode is enabled */
    selectedEndDate: PropTypes.instanceOf(Date),
    /** handler for start date selection */
    startDateSelect: PropTypes.func.isRequired,
    /** handler for end date selection, required in range mode */
    endDateSelect: PropTypes.func,
    rangeMode: PropTypes.bool,
    /** number of week day to be the first, 0 is Sunday */
    startOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
    /** object of appointments where keys are date strings in ISO 8601 format and values are arrays of objects with shape
     * { time: 'string with time', description: 'appointment description string'} */
    appointments: PropTypes.object,
    /** the day marked as the current day */
    today: PropTypes.instanceOf(Date),
    /** indicates that selection of date is started (start date is selected, end date is not). Use it if you need more control over range selection functionality */
    isSelectingRange: PropTypes.bool,
    /** provides currentMonth from outer component instead of Calendar's internal one. Can be used if you need to change current month view not only by default Calendar functionalty but also via some other actions */
    currentMonth: PropTypes.instanceOf(Date),
    /** handler for changes of currentMonth provided by outer component */
    changeCurrentMonth: PropTypes.func,
    /** provides year from outer component instead of Calendar's internal one. Can be used if you need to change year value in input not only by default Calendar functionalty but also via some other actions */
    yearInputValue: PropTypes.string,
    /** handler for changes of year value in input provided by outer component */
    changeYearInputValue: PropTypes.func,
    /** handler for blur on year input */
    blurYearInput: PropTypes.func,
    /** allow only dates from and including specified date */
    from: PropTypes.instanceOf(Date),
    /** allow only to from and including specified date */
    to: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    selectedStartDate: null,
    selectedEndDate: null,
    startDateSelect: () => {},
    endDateSelect: () => {},
    rangeMode: false,
    startOfWeek: 0,
    appointments: {},
    today: new Date(),
    isSelectingRange: null,
    currentMonth: null,
    changeCurrentMonth: null,
    yearInputValue: null,
    changeYearInputValue: null,
    blurYearInput: () => {},
    from: null,
    to: null,
  }

  state = {
    currentMonth: this.props.selectedStartDate || this.props.today,
    yearValue: this.props.selectedStartDate
      ? dateFns.format(this.props.selectedStartDate, FORMATS.YEAR_FORMAT)
      : dateFns.format(this.props.today, FORMATS.YEAR_FORMAT),
    isSelectingRange: false,
    supposedLastDate: null,
  }

  hasOuterSelectionIndicator = () => this.props.isSelectingRange !== null
  hasOuterCurrentMonth = () => Boolean(this.props.currentMonth)
  hasOuterYearValue = () => Boolean(this.props.yearInputValue)
  updateOuterCurrentMonth = date => {
    if (this.hasOuterCurrentMonth()) {
      this.props.changeCurrentMonth(date)
    }
  }

  updateOuterYearValue = year => {
    if (this.hasOuterYearValue()) {
      const formattedYear =
        year instanceof Date ? dateFns.format(year, FORMATS.YEAR_FORMAT) : year
      this.props.changeYearInputValue(formattedYear)
    }
  }

  changeMonth = isPrevious => {
    const dateFnsMethodName = isPrevious ? 'subMonths' : 'addMonths'
    const newMonth = this.hasOuterCurrentMonth()
      ? dateFns[dateFnsMethodName](this.props.currentMonth, 1)
      : dateFns[dateFnsMethodName](this.state.currentMonth, 1)
    this.setState({
      currentMonth: newMonth,
    })
    this.setState(({ currentMonth }) => ({
      yearValue: dateFns.format(currentMonth, FORMATS.YEAR_FORMAT),
    }))
    this.updateOuterCurrentMonth(newMonth)
    this.updateOuterYearValue(newMonth)
  }

  changeYear = year => {
    this.setState({ yearValue: year })
    if (year.match(YEAR_FORMAT_REGEXP)) {
      this.setState(({ currentMonth }) => ({
        currentMonth: dateFns.setYear(currentMonth, year),
      }))
      this.updateOuterCurrentMonth(
        dateFns.setYear(this.state.currentMonth, year),
      )
    }
    this.updateOuterYearValue(year)
  }

  handleYearInputBlur = () => {
    const { yearValue, currentMonth } = this.state
    if (!yearValue.match(YEAR_FORMAT_REGEXP)) {
      this.setState({
        yearValue: dateFns.format(currentMonth, FORMATS.YEAR_FORMAT),
      })
    }
    this.props.blurYearInput()
  }

  handleFirstSelect = date => {
    const { startDateSelect, endDateSelect, rangeMode } = this.props
    startDateSelect(date)
    if (rangeMode) {
      endDateSelect(null)
    }
    if (rangeMode && !this.hasOuterSelectionIndicator()) {
      this.setState({ isSelectingRange: true })
    }
  }

  handleLastSelect = date => {
    const { selectedStartDate, endDateSelect, startDateSelect } = this.props
    this.setState({ supposedLastDate: null })
    if (!this.hasOuterSelectionIndicator()) {
      this.setState({ isSelectingRange: false })
    }
    if (dateFns.isAfter(date, selectedStartDate)) {
      endDateSelect(date)
    } else {
      startDateSelect(date)
      endDateSelect(selectedStartDate)
    }
  }

  getDateSelectionHandler = (date, monthStart) => () => {
    if (!dateFns.isSameMonth(date, monthStart)) return
    if (this.props.isSelectingRange || this.state.isSelectingRange) {
      this.handleLastSelect(date)
    } else {
      this.handleFirstSelect(date)
    }
  }

  buildWeekDays() {
    const countOfWeekDays = 7

    const dayToStart = dateFns.startOfWeek(this.state.currentMonth, {
      weekStartsOn: this.props.startOfWeek,
    })

    const dayNames = times(countOfWeekDays).map(index => (
      <WeekDay key={index}>
        {dateFns.format(
          dateFns.addDays(dayToStart, index),
          FORMATS.WEEK_DAY_FORMAT,
        )}
      </WeekDay>
    ))
    return dayNames
  }

  buildDaysGrid() {
    const {
      currentMonth: currentMonthOwn,
      supposedLastDate,
      isSelectingRange: isSelectingRangeOwn,
    } = this.state
    const {
      appointments,
      startOfWeek,
      rangeMode,
      selectedStartDate,
      selectedEndDate,
      isSelectingRange,
      today,
      currentMonth,
      from,
      to,
    } = this.props
    const currentMonthValue = currentMonth || currentMonthOwn
    const countOfWeekDays = 7
    const monthStart = dateFns.startOfMonth(currentMonthValue)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart, {
      weekStartsOn: startOfWeek,
    })
    const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: startOfWeek })
    const daysWithAppointments =
      !isNil(appointments) && !isEmpty(appointments)
        ? Object.keys(appointments)
        : null

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      times(countOfWeekDays).forEach(index => {
        const dayClone = day
        const isOutOfMonth = !dateFns.isSameMonth(day, monthStart)
        const isCurrent = dateFns.isSameDay(day, today)
        const isSelected =
          dateFns.isSameDay(day, selectedStartDate) ||
          dateFns.isSameDay(day, selectedEndDate) ||
          dateFns.isSameDay(day, supposedLastDate)
        const isWithinRange = () => {
          const endDateToCompare = supposedLastDate || selectedEndDate
          const hasBothDates = selectedStartDate && endDateToCompare
          const isInSequentialRange =
            dateFns.isAfter(endDateToCompare, selectedStartDate) &&
            dateFns.isWithinRange(day, selectedStartDate, endDateToCompare)
          const isInReverseRange =
            dateFns.isBefore(endDateToCompare, selectedStartDate) &&
            dateFns.isWithinRange(day, endDateToCompare, selectedStartDate)
          const result =
            rangeMode &&
            hasBothDates &&
            (isInSequentialRange || isInReverseRange)
          return Boolean(result)
        }
        const isStartOfRange =
          rangeMode &&
          ((dateFns.isSameDay(day, selectedStartDate) &&
            ((supposedLastDate && dateFns.isBefore(day, supposedLastDate)) ||
              (selectedEndDate && dateFns.isBefore(day, selectedEndDate)))) ||
            ((supposedLastDate || selectedEndDate) &&
              (dateFns.isSameDay(day, supposedLastDate) ||
                dateFns.isSameDay(day, selectedEndDate)) &&
              dateFns.isBefore(day, selectedStartDate)))
        const isEndOfRange =
          rangeMode &&
          ((dateFns.isSameDay(day, selectedStartDate) &&
            (supposedLastDate || selectedEndDate) &&
            (dateFns.isAfter(day, supposedLastDate) ||
              dateFns.isAfter(day, selectedEndDate))) ||
            (supposedLastDate &&
              dateFns.isSameDay(day, supposedLastDate) &&
              dateFns.isAfter(day, selectedStartDate)) ||
            (selectedEndDate && dateFns.isSameDay(day, selectedEndDate)))
        const dayInDaysWithAppointments =
          daysWithAppointments &&
          find(item => dateFns.isSameDay(item, day))(daysWithAppointments)
        const currentAppointments =
          dayInDaysWithAppointments && appointments[dayInDaysWithAppointments]
        const handleMouseEnter = () => {
          if (rangeMode && (isSelectingRange || isSelectingRangeOwn)) {
            this.setState({ supposedLastDate: dayClone })
          }
        }
        const handleMouseLeave = () => {
          if (rangeMode && (isSelectingRange || isSelectingRangeOwn)) {
            this.setState({ supposedLastDate: null })
          }
        }

        const mouseProps = {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }

        days.push(
          <DayCell
            key={day}
            day={day}
            today={today}
            isOutOfMonth={isOutOfMonth}
            isWithinRange={isWithinRange()}
            isCurrent={isCurrent}
            isSelected={isSelected}
            isStartOfRange={isStartOfRange}
            isEndOfRange={isEndOfRange}
            rangeMode={rangeMode}
            appointments={currentAppointments || null}
            isFirst={index === 0}
            isLast={index === 6}
            disabled={
              (from && day.getTime() < from.getTime()) ||
              (to && day.getTime() > to.getTime())
            }
            onClick={this.getDateSelectionHandler(dayClone, monthStart)}
            {...(!isTouchDevice() && mouseProps)}
          />,
        )
        day = dateFns.addDays(day, 1)
      })
      rows.push(<DaysRow key={day}>{days}</DaysRow>)
      days = []
    }
    return rows
  }

  render() {
    const currentMonthValue = this.props.currentMonth || this.state.currentMonth
    const yearValue = this.props.yearInputValue || this.state.yearValue
    return (
      <CalendarWrapper {...this.props}>
        <Navigation>
          <IconWrapper onClick={() => this.changeMonth(true)}>
            <Glyph name="arrowLeft" size={25} />
          </IconWrapper>
          <MonthYearWrapper>
            <MonthName>
              {dateFns.format(currentMonthValue, FORMATS.MONTH_FORMAT)}
            </MonthName>
            <TextField
              grey
              value={yearValue}
              onChange={this.changeYear}
              onBlur={this.handleYearInputBlur}
              className={YEAR_INPUT_CLASSNAME}
            />
          </MonthYearWrapper>
          <IconWrapper onClick={() => this.changeMonth()}>
            <Glyph name="arrowRight" size={25} />
          </IconWrapper>
        </Navigation>
        <section>
          <WeekDaysRow>{this.buildWeekDays()}</WeekDaysRow>
          {this.buildDaysGrid()}
        </section>
      </CalendarWrapper>
    )
  }
}

const { Component } = attachClassName(Calendar)

export default Component
