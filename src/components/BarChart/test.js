import BarChart from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'
import { defaultFormatter } from '../../utils/charts'

const label1 = {
  name: 'Some label',
  color: 'green',
}
const label2 = {
  name: 'Some other label',
  color: 'red',
}
const getDefaultProps = () => ({
  data: [
    {
      x: '2020',
      values: [
        { value: 20, label: label1 },
        { value: 420, label: label2 },
      ],
    },
    {
      x: '2021',
      values: [
        { value: 10, label: label1 },
        { value: 210, label: label2 },
      ],
    },
  ],
})

describe('BarChart', () => {
  const props = getDefaultProps()
  const getBarChartWrapper = getWrapper(BarChart, props)

  const firstIndex = 0
  let wrapper
  beforeEach(() => {
    wrapper = getBarChartWrapper()
  })

  it('renders SVGs with bars', () => {
    expect(wrapper.find('svg').length).toBe(props.data.length)

    const paths = wrapper
      .find('svg')
      .at(firstIndex)
      .find('path')
    expect(paths.length).toBe(props.data[firstIndex].values.length)

    expect(paths.at(firstIndex).prop('fill')).toBe(label1.color)
    expect(paths.at(1).prop('fill')).toBe(label2.color)
  })

  it('renders a label with color', () => {
    const firstLabelHtml = wrapper
      .find('[data-test-value="chart-label"]')
      .at(firstIndex)
      .html()
    expect(firstLabelHtml).toMatch(label1.color)
    expect(firstLabelHtml).toMatch(label1.name)
  })

  it('renders a sum', () => {
    const sums = wrapper.find('[data-test-value="bar-chart-sum-label"]')
    const computedSum = props.data[firstIndex].values.reduce((acc, val) => {
      acc += val.value
      return acc
    }, 0)
    expect(sums.at(firstIndex).text()).toMatch(
      String(defaultFormatter(computedSum)),
    )
  })

  everyComponentTestSuite(getBarChartWrapper, BarChart, 'BarChart')
})
