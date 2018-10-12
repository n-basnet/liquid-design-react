import React from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedCalendar, Calendar } from '~/modules/Calendar'
import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
const sampleDate1 = new Date()
const sampleDate2 = new Date()
sampleDate1.setDate(sampleDate1.getDate() + 1).toString()
sampleDate2.setDate(sampleDate2.getDate() - 5).toString()
const sampleAppointments = {
  [sampleDate1]: [{ time: '13:00', description: 'meeting with Charlie' }],
  [sampleDate2]: [{ time: '10:00', description: 'meeting with Brian' }],
}

storiesOf('Modules/Calendar', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Calendar))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedCalendar]),
    },
  })
  .add('default', () => <EnhancedCalendar />, getSnippetTemplate(`<Calendar />`))
  .add(
    'with custom start of week',
    () => <EnhancedCalendar startOfWeek={1} />,
    getSnippetTemplate(`<Calendar startOfWeek={1}/>`)
  )
  .add(
    'with appointments',
    () => <EnhancedCalendar appointments={sampleAppointments} />,
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
