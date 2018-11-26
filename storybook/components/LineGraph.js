import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTablesExcludeList, getNumberKnob, Fragment } from '../helpers'
import { Graph } from '~/components/LineGraph/Graph'
import { default as EnhancedLineGraph, LineGraph } from '~/components/LineGraph'

const getValueY = (id, value) => getNumberKnob({ name: `value-${id}`, defaultValue: value })

const getData = () => [
  [
    { x: 1, y: getValueY(1, 5) },
    { x: 2, y: getValueY(2, 100) },
    { x: 3, y: getValueY(3, 100) },
    { x: 4, y: getValueY(4, 0) },
    { x: 5, y: getValueY(5, 200) },
    { x: 6, y: getValueY(6, 250) },
    { x: 7, y: getValueY(7, 200) },
    { x: 8, y: getValueY(8, 200) },
    { x: 9, y: getValueY(9, 190) },
    { x: 10, y: 190 },
    { x: 11, y: 100 },
    { x: 12, y: 100 },
    { x: 13, y: 100 },
    { x: 14, y: 150 },
    { x: 15, y: 200 },
    { x: 16, y: 250 },
    { x: 17, y: 200 },
    { x: 18, y: 200 },
    { x: 19, y: 190 },
    { x: 20, y: 190 },
    { x: 21, y: 190 },
    { x: 22, y: 190 },
    { x: 23, y: 190 },
    { x: 24, y: 290 },
    { x: 25, y: 270 },
    { x: 26, y: 220 },
    { x: 27, y: 280 },
  ],
  [
    { x: 1, y: 10 },
    { x: 2, y: 120 },
    { x: 3, y: 160 },
    { x: 4, y: 250 },
    { x: 5, y: 250 },
    { x: 6, y: 300 },
    { x: 7, y: 250 },
    { x: 8, y: 200 },
    { x: 9, y: 200 },
    { x: 10, y: 200 },
    { x: 11, y: 110 },
    { x: 12, y: 120 },
    { x: 13, y: 160 },
    { x: 14, y: 210 },
    { x: 15, y: 270 },
    { x: 16, y: 280 },
    { x: 17, y: 210 },
    { x: 18, y: 195 },
    { x: 19, y: 196 },
    { x: 20, y: 197 },
    { x: 21, y: 199 },
    { x: 22, y: 300 },
    { x: 23, y: 500 },
    { x: 24, y: 550 },
    { x: 25, y: 560 },
    { x: 26, y: 560 },
  ],
]

storiesOf('Components/LineGraph', module)
  .addDecorator(storyFn => (
    <Fragment>
      <style>
        {`
          #storybook-main-element > div > :last-child {
            max-width: 100vw;
            overflow: scroll;
          }
        `}
      </style>
      {storyFn()}
    </Fragment>
  ))
  .addParameters({
    info: {
      propTables: [LineGraph],
      propTablesExclude: getPropTablesExcludeList([EnhancedLineGraph, Graph]),
    },
  })
  .add(
    'default',
    () => (
      <LineGraph
        data={getData()}
        chartWidth={getNumberKnob({ name: 'chartWidth', defaultValue: 1000 })}
        chartHeight={getNumberKnob({ name: 'chartHeight', defaultValue: 400 })}
        labelsAxisX={['17.Oct.2018', '08.Nov.2018']}
        mobileLabelsAxisX={['17.Oct.2018', '08.Nov.2018']}
        tickFormatAxisX={['KW 21', 'KW 22', 'KW 23', 'KW 24']}
        tickValuesAxisX={[1, 8, 15, 22]}
        tickFormatAxisY={v =>
          `${v
            .toFixed(0)
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} EUR`
        }
      />
    ),
    {
      info: {
        text: `
    The data has to be provided the following format:
    ~~~js
    const data = [
      [
        { x: 1, y: 50 },
        { x: 2, y: 1000 },
        { x: 3, y: 1000 },
      ],
      [
        { x: 1, y: 0 },
        { x: 2, y: 1100 },
        { x: 3, y: 1200 },
      ],
    ]
    ~~~
    The Line Graph code snippet can looks like this:
    ~~~js
      <LineGraph
        data={data}
        labelsAxisX={['17.Oct.2018', '08.Nov.2018']}
        mobileLabelsAxisX={['17.Oct.2018', '08.Nov.2018']}
        tickFormatAxisX={['KW 21', 'KW 22', 'KW 23', 'KW 22']}
        tickValuesAxisX={[1, 7, 14, 21]}
        tickCountAxisY={12}
        unit='ml'
      />
    ~~~

    Customized variant with explicit domain for Axis X, mobile height set to 50% and Y axis has custom formatting function (to currency).
    The Line Graph code snippet can looks like this:
    ~~~js
      <LineGraph
        ....
        domainAxisY={[-2000, 7000]}
        mobileChartHeightAmount={0.6}
        tickFormatAxisY={v => parseToCurrency(v, '$')}
      />
    ~~~
    `,
      },
    }
  )
