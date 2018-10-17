import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import dateFns from 'date-fns'
import { isEmpty, isNil, find } from 'ramda'

import { times } from '~/utils/aux'
import { GLOBAL_CSS_PREFIX } from '~/utils/consts'
import { media } from '~/utils/styling'
import { Glyph } from '~/elements/Icon'
import TextField, { TEXT_FIELD_CLASSNAMES } from '~/elements/TextField'
import DayCell from '~/modules/Calendar/DayCell'
import { INPUT_SINGLELINE_CLASSNAME } from '~/components/aux/Input'
import attachClassName from '~/components/aux/hoc/attachClassName'

const YEAR_INPUT_CLASSNAME = `${GLOBAL_CSS_PREFIX}YearInput`
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
const yearRegexp = /^[\d]{4}$/

export class Calendar extends PureComponent {
  static propTypes = {
    /** date selected by default */
    defaultSelectedDate: PropTypes.instanceOf(Date),
    /** handler for date selection */
    onSelect: PropTypes.func,
    /** number of week day to be the first, 0 is Sunday */
    startOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
    /** object of appointments where keys are date strings in ISO 8601 format and values are arrays of objects with shape
     * { time: 'string with time', description: 'appointment description string'} */
    appointments: PropTypes.object,
    /** the day marked as the current day */
    today: PropTypes.instanceOf(Date),
  }
  static defaultProps = {
    defaultSelectedDate: null,
    onSelect: () => {},
    startOfWeek: 0,
    appointments: {},
    today: new Date(),
  }
  state = {
    currentMonth: this.props.defaultSelectedDate || this.props.today,
    selectedDate: this.props.defaultSelectedDate,
    yearValue: this.props.defaultSelectedDate
      ? dateFns.format(this.props.defaultSelectedDate, 'YYYY')
      : dateFns.format(this.props.today, 'YYYY'),
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
    })
    this.setState(({ currentMonth }) => ({ yearValue: dateFns.format(currentMonth, 'YYYY') }))
  }

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
    })
    this.setState(({ currentMonth }) => ({ yearValue: dateFns.format(currentMonth, 'YYYY') }))
  }

  changeYear = year => {
    this.setState({ yearValue: year })
    if (year.match(yearRegexp)) {
      this.setState(({ currentMonth }) => ({ currentMonth: dateFns.setYear(currentMonth, year) }))
    }
  }

  handleYearInputBlur = () => {
    const { yearValue, currentMonth } = this.state
    if (!yearValue.match(yearRegexp)) {
      this.setState({ yearValue: dateFns.format(currentMonth, 'YYYY') })
    }
  }

  onDateSelection = (date, monthStart) => {
    if (!dateFns.isSameMonth(date, monthStart)) return
    this.setState({ selectedDate: date })
    this.props.onSelect(date)
  }

  buildWeekDays() {
    const daysFormat = 'ddd'
    const countOfWeekDays = 7

    const dayToStart = dateFns.startOfWeek(this.state.currentMonth, {
      weekStartsOn: this.props.startOfWeek,
    })

    const dayNames = times(countOfWeekDays).map(index => (
      <WeekDay key={index}>
        {dateFns.format(dateFns.addDays(dayToStart, index), daysFormat)}
      </WeekDay>
    ))
    return dayNames
  }

  buildDaysGrid() {
    const { currentMonth, selectedDate } = this.state
    const { appointments, startOfWeek, today } = this.props

    const countOfWeekDays = 7
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: startOfWeek })
    const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: startOfWeek })
    const daysWithAppointments =
      !isNil(appointments) && !isEmpty(appointments) ? Object.keys(appointments) : null

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      times(countOfWeekDays).forEach(index => {
        const dayClone = day
        const isOutOfMonth = !dateFns.isSameMonth(day, monthStart)
        const isCurrent = dateFns.isSameDay(day, today)
        const isSelected = dateFns.isSameDay(day, selectedDate)
        const dayInDaysWithAppointments =
          daysWithAppointments && find(item => dateFns.isSameDay(item, day))(daysWithAppointments)
        const currentAppointments =
          dayInDaysWithAppointments && appointments[dayInDaysWithAppointments]
        days.push(
          <DayCell
            key={day}
            day={day}
            today={today}
            isOutOfMonth={isOutOfMonth}
            isCurrent={isCurrent}
            isSelected={isSelected}
            appointments={currentAppointments || null}
            isFirst={index === 0}
            isLast={index === 6}
            onClick={() => {
              this.onDateSelection(dayClone, monthStart)
            }}
          />
        )
        day = dateFns.addDays(day, 1)
      })
      rows.push(<DaysRow key={day}>{days}</DaysRow>)
      days = []
    }
    return rows
  }

  render() {
    return (
      <CalendarWrapper {...this.props}>
        <Navigation>
          <IconWrapper onClick={this.prevMonth}>
            <Glyph name='arrowLeft' size={25} />
          </IconWrapper>
          <MonthYearWrapper>
            <MonthName>{dateFns.format(this.state.currentMonth, 'MMM')}</MonthName>
            <TextField
              grey
              value={this.state.yearValue}
              onChange={this.changeYear}
              onBlur={this.handleYearInputBlur}
              className={YEAR_INPUT_CLASSNAME}
            />
          </MonthYearWrapper>
          <IconWrapper onClick={this.nextMonth}>
            <Glyph name='arrowRight' size={25} />
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
