import React from 'react'
import { storiesOf } from '@storybook/react'

import { times } from '~/utils/aux'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
  objectToJSXAttrs,
  isStorybookLokiBuild,
} from '../helpers'
import { default as EnhancedStackedBarChart, StackedBarChart } from '~/components/StackedBarChart'

const LABELS_AMOUNT = 7
const VALUES_AMOUNT = 12
const MIN_VALUE = 4
const labels = times(LABELS_AMOUNT).map(i => ({
  name: `Label ${i + 1}`,
}))
const getDefaultProps = () => ({
  data: times(VALUES_AMOUNT).map(i => ({
    name: `Jan ${i + 1}`,
    values: times(LABELS_AMOUNT).map(k => {
      const randomValue = Math.max(MIN_VALUE, Math.ceil(Math.random() * 10))
      const value = isStorybookLokiBuild() ? i * 2 + k * 5 : randomValue
      return {
        // first one is zero, just to show that value of 0 will render a minimum height section
        value: i === 0 ? (k === 0 ? 0 : value) : value,
        label: labels[k],
      }
    }),
  })),
})

const defaultProps = getDefaultProps()
const DESCRIPTION = `Stacked bar charts display relative shares of a larger sum of individual parts. The parts can be filtered by clicking on the respective labels. On click, detailed information about the individual data point is shown.`

const slimData = defaultProps.data
  .map(point => ({ ...point, values: point.values.slice(0, 2) }))
  .slice(0, 2)

storiesOf('Components/StackedBarChart', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedStackedBarChart]),
      propTables: [StackedBarChart],
    },
  })
  .add(
    'default',
    () => <StackedBarChart {...defaultProps} />,
    getSnippetTemplate(
      `<StackedBarChart
    ${objectToJSXAttrs({ ...defaultProps, data: slimData })}
  />`,
      DESCRIPTION
    )
  )
