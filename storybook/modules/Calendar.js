import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import dateFns from 'date-fns'

import EnhancedCalendar, { Calendar } from '../../src/modules/Calendar'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
  isStorybookLokiBuild,
} from '../helpers'

const today = isStorybookLokiBuild() ? new Date(2018, 10, 10) : new Date()
const sampleDate1 = new Date()
const sampleDate2 = new Date()
sampleDate1.setDate(sampleDate1.getDate() + 1).toString()
sampleDate2.setDate(sampleDate2.getDate() - 5).toString()
const sampleAppointments = {
  [dateFns.addDays(today, -5)]: [
    { time: '13:00', description: 'meeting with Charlie' },
  ],
  [dateFns.addDays(today, 1)]: [
    { time: '10:00', description: 'meeting with Brian' },
  ],
}

export class CalendarApp extends PureComponent {
  static propTypes = {
    rangeMode: PropTypes.bool,
  }

  static defaultProps = {
    rangeMode: false,
  }

  state = {
    selectedStartDate: null,
    selectedEndDate: null,
  }

  handleStartDateChange = date => {
    this.setState({ selectedStartDate: date })
  }

  handleEndDateChange = date => {
    this.setState({ selectedEndDate: date })
  }

  render() {
    const { rangeMode, ...props } = this.props
    const { selectedEndDate, selectedStartDate } = this.state
    return (
      <EnhancedCalendar
        today={today}
        selectedStartDate={selectedStartDate}
        selectedEndDate={rangeMode ? selectedEndDate : undefined}
        startDateSelect={this.handleStartDateChange}
        endDateSelect={rangeMode ? this.handleEndDateChange : undefined}
        rangeMode={rangeMode}
        {...props}
      />
    )
  }
}

storiesOf('Modules/Calendar', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        EnhancedCalendar,
        CalendarApp,
      ]),
      propTables: [Calendar],
    },
  })
  .add(
    'default',
    () => <CalendarApp />,
    getSnippetTemplate(`
  class CalendarApp extends PureComponent {
    state = {
      selectedDate: null
    }

    handleStartDateChange = date => {
      this.setState({ selectedStartDate: date })
    }

    render() {
      const { selectedStartDate } = this.state

      return (
        <Calendar
          selectedStartDate={selectedStartDate}
          startDateSelect={this.handleStartDateChange}
        />
      )
    }
  }
  `),
  )
  .add(
    'with custom start of week',
    () => <CalendarApp startOfWeek={1} />,
    getSnippetTemplate(`
  class CalendarApp extends PureComponent {
    state = {
      selectedDate: null
    }

    handleStartDateChange = date => {
      this.setState({ selectedStartDate: date })
    }

    render() {
      const { selectedStartDate } = this.state

      return (
        <Calendar
          selectedStartDate={selectedStartDate}
          startDateSelect={this.handleStartDateChange}
          startOfWeek={1}
        />
      )
    }
  }
  `),
  )
  .add(
    'with from and to dates',
    () => (
      <CalendarApp from={new Date('2020-07-13')} to={new Date('2020-07-25')} />
    ),
    getSnippetTemplate(`
  class CalendarApp extends PureComponent {
    state = {
      selectedDate: null
    }

    handleStartDateChange = date => {
      this.setState({ selectedStartDate: date })
    }

    render() {
      const { selectedStartDate } = this.state

      return (
        <Calendar
          selectedStartDate={selectedStartDate}
          startDateSelect={this.handleStartDateChange}
          startOfWeek={1}
        />
      )
    }
  }
  `),
  )
  .add(
    'with appointments',
    () => <CalendarApp appointments={sampleAppointments} />,
    getSnippetTemplate(`
  class CalendarApp extends PureComponent {
    state = {
      selectedDate: null,
      appointments: {
        {
          'Tue Sep 18 2018 18:21:37 GMT+0300 (Eastern European Summer Time)': [
            {
              time: '13:00',
              description: 'meeting with Charlie'
            }
          ],
          'Wed Sep 12 2018 18:24:41 GMT+0300 (Eastern European Summer Time)': [
            {
              time: '10:00',
              description: 'meeting with Brian'
            }
          ]
        }
      }
    }

    handleStartDateChange = date => {
      this.setState({ selectedStartDate: date })
    }

    render() {
      const { selectedStartDate, appointments } = this.state

      return (
        <Calendar
          selectedStartDate={selectedStartDate}
          startDateSelect={this.handleStartDateChange}
          appointments={appointments}
        />
      )
    }
  }
  `),
  )
  .add(
    'in range mode',
    () => <CalendarApp rangeMode />,
    getSnippetTemplate(`
  class CalendarApp extends PureComponent {
    state = {
      selectedStartDate: null,
      selectedEndDate: null,
    }

    handleStartDateChange = date => {
      this.setState({ selectedStartDate: date })
    }
    handleEndDateChange = date => {
      this.setState({ selectedEndDate: date })
    }

    render() {
      const { selectedStartDate, selectedEndDate } = this.state
      return (
        <Calendar
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          startDateSelect={this.handleStartDateChange}
          endDateSelect={this.handleEndDateChange}
          rangeMode
        />
      )
    }
  `),
  )
