import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import COLORS from '~/utils/consts/colors'
import {
  CHART_PIXEL_PADDING,
  CHART_PIXEL_HEIGHT,
  CHART_PIXEL_WIDTH,
  DESKTOP_LINE_SIZE,
  MOBILE_LINE_SIZE,
  MOBILE_CHART_PIXEL_PADDING,
  MOBILE_CHART_HEIGHT_AMOUNT,
  TICK_COUNT,
  LINE_CHART_LABELS_PRECISION,
} from '~/components/LineGraph/consts'
import { isMobile } from '~/components/LineGraph/utils'
import attachClassName from '~/components/aux/hoc/attachClassName'
import { LineGraphWrapper } from '~/components/LineGraph/StyledComponents'
import Graph from '~/components/LineGraph/Graph'

export class LineGraph extends PureComponent {
  state = {
    width: this.props.chartWidth,
    height: this.props.chartHeight,
  }

  componentDidMount() {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
  }

  componentDidUpdate() {
    this.updateSize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }

  updateSize = () => {
    const { chartWidth, chartHeight } = this.props
    const heightAmount = Math.min(Math.max(this.props.mobileChartHeightAmount, 0.2), 1)

    // use document.documentElement.clientWidth fixes problem on mobile Safari
    const mobileWidth = window.innerWidth
    const mobileHeight =
      (window.screen.height || window.innerHeight) * heightAmount - MOBILE_CHART_PIXEL_PADDING.top

    isMobile()
      ? this.setState({ width: mobileWidth, height: mobileHeight })
      : this.setState({ width: Math.min(mobileWidth, chartWidth), height: chartHeight })
  }

  render() {
    const { data, ...newProps } = this.props
    const { width, height } = this.state
    return (
      <LineGraphWrapper {...newProps} chartWidth={width} chartHeight={height}>
        <Graph {...newProps} data={data} chartWidth={width} chartHeight={height} />
      </LineGraphWrapper>
    )
  }
}

export const propTypes = {
  /** Those values are provided in pixels, though in scaled graphs the value will be used to maintain the aspect ratio */
  chartPadding: PropTypes.object,
  /** The value is provided in pixels, though in scaled graphs the value will be used to maintain the aspect ratio */
  chartWidth: PropTypes.number,
  /** The value is provided in pixels, though in scaled graphs the value will be used to maintain the aspect ratio */
  chartHeight: PropTypes.number,
  /** Sets height ratio of the screen, to be covered by graph on mobile devices. Accepted range: 0.2...1, default value - 0.75 */
  mobileChartHeightAmount: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      })
    )
  ).isRequired,
  /** The domainAxisX prop describes the range of data the component will include. */
  domainAxisX: PropTypes.arrayOf(PropTypes.number),
  domainAxisY: PropTypes.arrayOf(PropTypes.number),
  labelsAxisX: PropTypes.array,
  /** Array of predefined hex colors as strings (eg ['#FAFAFA']), that will be used for drawing lines. */
  linesColors: PropTypes.arrayOf(PropTypes.string),
  lineSize: PropTypes.number,
  mobileLineSize: PropTypes.number,
  mobileChartPadding: PropTypes.object,
  mobileLabelsAxisX: PropTypes.array,
  /** The tickCountAxisX prop specifies approximately how many ticks should be drawn on the axis X. */
  tickCountAxisX: PropTypes.number,
  /** The tickCountAxisY prop specifies approximately how many ticks should be drawn on the axis Y. */
  tickCountAxisY: PropTypes.number,
  /** The tickFormatAxisX prop specifies how tick values should be labeled. The tickFormat prop can be given as an array of values to display for each tick, or as a function to be applied to every tickValue */
  tickFormatAxisX: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  /** The tickValuesAxisX prop explicitly specifies a set of tick values to draw on the axis X. */
  tickValuesAxisX: PropTypes.arrayOf(PropTypes.number),
  /** The tickFormatAxisX prop specifies how tick values should be labeled.
   The tickFormat prop can be given as an array of values to display for each tick, or as a function to be applied to every tickValue.
   Important! If u pass custom values of function, unit prop will not be added automatically.
   */
  tickFormatAxisY: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  /** The tickValuesAxisY prop explicitly specifies a set of tick values to draw on the axis Y. */
  tickValuesAxisY: PropTypes.arrayOf(PropTypes.number),
  /** The tickAxisYPrecision prop specifies fractional part for default values (unless we use custom tickFormatAxisY).
   For precision equals 3, numer 5 will be displayed as 5.000 and 5.1234 will be 5.123. Default value is 0 (integers) */
  tickAxisYPrecision: PropTypes.number,
  /** Unit that will be added to Y axis values and tooltip values, eg `1000 ml` */
  unit: PropTypes.string,
}

export const defaultProps = {
  chartPadding: CHART_PIXEL_PADDING,
  chartWidth: CHART_PIXEL_WIDTH,
  chartHeight: CHART_PIXEL_HEIGHT,
  domainAxisX: undefined,
  domainAxisY: undefined,
  mobileChartHeightAmount: MOBILE_CHART_HEIGHT_AMOUNT,
  labelsAxisX: null,
  linesColors: [
    COLORS.VIBRANT_CYAN,
    COLORS.VIBRANT_YELLOW,
    COLORS.VIBRANT_GREEN,
    COLORS.VIBRANT_MAGENTA,
    COLORS.RICH_PURPLE,
    COLORS.RICH_BLUE,
  ],
  lineSize: DESKTOP_LINE_SIZE,
  mobileLineSize: MOBILE_LINE_SIZE,
  tickAxisYPrecision: LINE_CHART_LABELS_PRECISION,
  mobileChartPadding: MOBILE_CHART_PIXEL_PADDING,
  mobileLabelsAxisX: null,
  tickCountAxisX: TICK_COUNT.X,
  tickCountAxisY: TICK_COUNT.Y,
  tickFormatAxisX: null,
  tickValuesAxisX: null,
  tickFormatAxisY: null,
  tickValuesAxisY: null,
  tooltipLabelFormat: null,
  unit: '',
}

LineGraph.propTypes = propTypes
LineGraph.defaultProps = defaultProps

const { Component } = attachClassName(LineGraph)

export default Component
