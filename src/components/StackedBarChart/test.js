import StackedBarChart from '.'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'

const labels = [
  {
    name: 'Label 1',
  },
  {
    name: 'Label 2',
  },
]
const getDefaultProps = () => ({
  data: [
    {
      name: 'Jan 1',
      values: [
        {
          value: 8,
          label: labels[0],
        },
        {
          value: 6,
          label: labels[1],
        },
      ],
    },
    {
      name: 'Jan 2',
      values: [
        {
          value: 7,
          label: labels[0],
        },
        {
          value: 6,
          label: labels[1],
        },
      ],
    },
  ],
})

const labelSelector = '[data-test-value="chart-label"]'
const overlaySelector = '[data-test-value="stacked-bar-overlay"]'

describe('StackedBarChart', () => {
  const props = getDefaultProps()
  const getStackedBarChartWrapper = getWrapper(StackedBarChart, props)
  let wrapper
  let getFirstBarChildren

  beforeEach(() => {
    wrapper = getStackedBarChartWrapper(props)
    getFirstBarChildren = () =>
      wrapper
        .find('svg g')
        .first()
        .children()
  })

  it('renders SVGs', () => {
    expect(wrapper.find('svg').length).toBe(props.data.length)
  })

  it('renders labels', () => {
    const labelsElements = wrapper.find(labelSelector)
    expect(labelsElements.length).toBe(props.data.length)
    expect(labelsElements.first().text()).toEqual(labels[0].name)
  })

  it('filters data by clicking on a label', () => {
    expect(getFirstBarChildren().length).toBe(props.data[0].values.length)
    wrapper
      .find(labelSelector)
      .first()
      .simulate('click')
    expect(getFirstBarChildren().length).toBe(1)
    wrapper
      .find(labelSelector)
      .at(1)
      .simulate('click')
    expect(getFirstBarChildren().length).toBe(2)
  })

  it('filters data by clicking on a chart bar section', () => {
    expect(wrapper.find(overlaySelector).length).toBe(0)
    wrapper
      .find('svg g rect')
      .first()
      .simulate('click')
    expect(wrapper.find(overlaySelector).length).toBe(1)
  })

  everyComponentTestSuite(getStackedBarChartWrapper, StackedBarChart, 'StackedBarChart')
})
