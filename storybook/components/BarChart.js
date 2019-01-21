import React from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedBarChart, BarChart } from '~/components/BarChart'
import { times } from '~/utils/misc'
import {
  randomInRange,
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
  objectToJSXAttrs,
  isStorybookLokiBuild,
} from '../helpers'
import { currencyFormatter, thousandsFormatter } from '../helpers/charts'

const getValue = (i, k) =>
  i === 0 && k === 0
    ? 0
    : isStorybookLokiBuild()
      ? i * k
      : randomInRange(35, 165) * 1000 + Math.random()

const getDefaultProps = () => ({
  valueFormatter: currencyFormatter,
  yTickFormatter: thousandsFormatter,
  data: times(10).map(i => ({
    values: times(5).map(k => ({
      value: getValue(i, k),
      label: {
        name: `Label ${k + 1}`,
      },
    })),
    x: String(2020 + i),
  })),
})

const DESCRIPTION = `The bar chart is used for number comparisons in relation to a progressing value (e.g. time).`

const defaultProps = getDefaultProps()
const slimData = {
  ...defaultProps,
  data: defaultProps.data
    .map(point => ({ ...point, values: point.values.slice(0, 2) }))
    .slice(0, 2),
}

storiesOf('Components/BarChart', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedBarChart]),
      propTables: [BarChart],
    },
  })
  .add(
    'default',
    () => <EnhancedBarChart {...defaultProps} />,
    getSnippetTemplate(
      `<BarChart
    ${objectToJSXAttrs({ ...defaultProps, data: slimData })}
  />`,
      DESCRIPTION
    )
  )
