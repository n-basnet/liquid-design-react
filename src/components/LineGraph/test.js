import LineGraph from '.'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'

const data = [
  [
    { x: 0, y: 50 },
    { x: 1, y: 1000 },
    { x: 2, y: 1000 },
    { x: 3, y: 1500 },
    { x: 4, y: 2000 },
    { x: 5, y: 2500 },
    { x: 6, y: 2000 },
    { x: 7, y: 2000 },
    { x: 8, y: 1900 },
    { x: 9, y: 1900 },
    { x: 10, y: 1000 },
    { x: 11, y: 1000 },
    { x: 12, y: 1000 },
    { x: 13, y: 1500 },
    { x: 14, y: 2000 },
    { x: 15, y: 2500 },
    { x: 16, y: 2000 },
    { x: 17, y: 2000 },
    { x: 18, y: 1900 },
    { x: 19, y: 1900 },
    { x: 20, y: 1900 },
    { x: 21, y: 1900 },
    { x: 22, y: 1900 },
    { x: 23, y: 2900 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 1100 },
    { x: 2, y: 1200 },
    { x: 3, y: 1600 },
    { x: 4, y: 2500 },
    { x: 5, y: 2500 },
    { x: 6, y: 3000 },
    { x: 7, y: 2500 },
    { x: 8, y: 2000 },
    { x: 9, y: 2000 },
    { x: 10, y: 2000 },
    { x: 11, y: 1100 },
    { x: 12, y: 1200 },
    { x: 13, y: 1600 },
    { x: 14, y: 2100 },
    { x: 15, y: 2700 },
    { x: 16, y: 2800 },
    { x: 17, y: 2100 },
    { x: 18, y: 1950 },
    { x: 19, y: 1960 },
    { x: 20, y: 1970 },
    { x: 21, y: 1990 },
    { x: 22, y: 3000 },
    { x: 23, y: 5000 },
  ],
]

const defaultProps = {
  data,
  domainAxisY: [0, 800],
  graphWrapperMaxWidth: '1000px',
  labelsAxisX: ['17.Oct.2017'],
  mobileLabelsAxisX: ['17.Oct.', '2017'],
  tooltipLabelFormat: () => {},
  tickFormatAxisX: ['KW 21'],
  tickFormatAxisY: () => {},
  tickValuesAxisX: [21],
}

describe('LineGraph', () => {
  const getLineGraphWrapper = getWrapper(LineGraph, defaultProps)
  everyComponentTestSuite(getLineGraphWrapper, LineGraph, 'LineGraph')
})
