import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
  Fragment
} from '../helpers'
import {
  default as EnhancedDatePicker,
  DATE_PICKER_CLASSNAMES,
  DatePicker
} from '~/modules/DatePicker'

const getDatePickerSnippet = props => `
  <DatePicker ${props || ``} />
`

storiesOf('Modules/DatePicker', module)
  .addDecorator(getBackgroundWrapper())
  // Storybook override is necessary for solving mobile Firefox 'overflow-x: scroll' issue where scroll overlaps the Calendar in DatePicker
  .addDecorator(storyFn => (
    <Fragment>
      <style>
        {`
          #storybook-main-element > div .language-js {
            overflow: hidden !important;
          }
          .${DATE_PICKER_CLASSNAMES.BASE} {
            height: 125px;
          }
        `}
      </style>
      {storyFn()}
    </Fragment>
  ))
  .addDecorator(includeComponentInPropTable(DatePicker))
  .addParameters({
    info: {
      propTables: [DatePicker],
      propTablesExclude: getPropTablesExcludeList([EnhancedDatePicker])
    }
  })
  .add('default', () => <EnhancedDatePicker />, getSnippetTemplate(getDatePickerSnippet()))
  .add(
    'disabled',
    () => <EnhancedDatePicker disabled />,
    getSnippetTemplate(getDatePickerSnippet('disabled'))
  )
  .add(
    'range mode',
    () => <EnhancedDatePicker rangeMode />,
    getSnippetTemplate(getDatePickerSnippet('rangeMode'))
  )
  .add(
    'disabled range mode',
    () => <EnhancedDatePicker rangeMode disabled />,
    getSnippetTemplate(getDatePickerSnippet('rangeMode disabled'))
  )
  .add(
    'single mode with calendar',
    () => <EnhancedDatePicker withCalendar />,
    getSnippetTemplate(getDatePickerSnippet('withCalendar'))
  )
  .add(
    'disabled single mode with calendar',
    () => <EnhancedDatePicker withCalendar disabled />,
    getSnippetTemplate(getDatePickerSnippet('withCalendar disabled'))
  )
  .add(
    'range mode with calendar',
    () => (
      <EnhancedDatePicker
        rangeMode
        withCalendar
        onStartDateChange={() => console.log('Start Date changed')}
        onEndDateChange={() => console.log('End Date changed')}
      />
    ),
    getSnippetTemplate(getDatePickerSnippet('rangeMode withCalendar'))
  )
  .add(
    'with props passed to Calendar',
    () => <EnhancedDatePicker rangeMode withCalendar calendarProps={{ startOfWeek: 1 }} />,
    getSnippetTemplate(
      getDatePickerSnippet('rangeMode withCalendar calendarProps={{ startOfWeek: 1 }}')
    )
  )
  .add(
    'disabled range mode with calendar',
    () => <EnhancedDatePicker disabled rangeMode withCalendar />,
    getSnippetTemplate(getDatePickerSnippet('disabled rangeMode withCalendar'))
  )
