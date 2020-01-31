import LineGraph from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'

const data = [
  [
    { x: 0, y: 50 },
    { x: 1, y: 1000 },
    { x: 2, y: 1000 },
    { x: 3, y: 1500 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 1100 },
    { x: 2, y: 1200 },
    { x: 3, y: 1600 },
  ],
]

const defaultProps = {
  data,
}

describe('LineGraph', () => {
  const getLineGraphWrapper = getWrapper(LineGraph, defaultProps)
  everyComponentTestSuite(getLineGraphWrapper, LineGraph, 'LineGraph')
})
