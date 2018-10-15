import React from 'react'
import { storiesOf } from '@storybook/react'
import dateFns from 'date-fns'

import { default as EnhancedCalendar, Calendar } from '~/modules/Calendar'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
  isStorybookLokiBuild,
} from '../helpers'

const today = isStorybookLokiBuild() ? new Date(2018, 10, 10) : new Date()

const defaultProps = {
  today,
}

const sampleAppointments = {
  [dateFns.addDays(today, -5)]: [{ time: '13:00', description: 'meeting with Charlie' }],
  [dateFns.addDays(today, 1)]: [{ time: '10:00', description: 'meeting with Brian' }],
}

storiesOf('Modules/Calendar', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedCalendar]),
      propTables: [Calendar],
    },
  })
  .add('default', () => <EnhancedCalendar {...defaultProps} />, getSnippetTemplate(`<Calendar />`))
  .add(
    'with custom start of week',
    () => <EnhancedCalendar {...defaultProps} startOfWeek={1} />,
    getSnippetTemplate(`<Calendar startOfWeek={1}/>`)
  )
  .add(
    'with appointments',
    () => <EnhancedCalendar {...defaultProps} appointments={sampleAppointments} />,
    getSnippetTemplate(`
  <Calendar
    appointments={
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
  />`)
  )
