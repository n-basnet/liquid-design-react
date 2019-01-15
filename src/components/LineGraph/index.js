import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import COLORS from '~/utils/consts/colors'
import attachClassName from '~/components/misc/hoc/attachClassName'
import LineGraphWrapper from '~/components/LineGraph/LineGraphWrapper'
import { defaultFormatter } from '~/utils/charts'
import Graph from '~/components/LineGraph/Graph'

export class LineGraph extends PureComponent {
  state = {
    width: 0,
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

  updateSize = () =>
    this.setState({
      width: this.wrapperRef.getBoundingClientRect().width,
    })

  render() {
    const { data, ...props } = this.props
    const { width } = this.state
    return (
      <LineGraphWrapper
        {...props}
        innerRef={v => {
          this.wrapperRef = v
        }}
      >
        <Graph {...props} data={data} chartWidth={width} chartHeight={props.chartHeight} />
      </LineGraphWrapper>
    )
  }
}

export const propTypes = {
  /** Chart padding */
  chartPadding: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
  }),
  /** Chart height in pixels */
  chartHeight: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      })
    )
  ).isRequired,
  /** The range of data the component will include on x axis. */
  domainAxisX: PropTypes.arrayOf(PropTypes.number),
  /** The range of data the component will include on y axis. */
  domainAxisY: PropTypes.arrayOf(PropTypes.number),
  labelsAxisX: PropTypes.array,
  /** Array of predefined hex colors as strings (eg ['#FAFAFA']), that will be used for drawing lines. */
  linesColors: PropTypes.arrayOf(PropTypes.string),
  lineSize: PropTypes.number,
  mobileLineSize: PropTypes.number,
  mobileChartPadding: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
  }),
  /** The tickCountAxisX prop specifies approximately how many ticks should be drawn on the axis X. */
  tickCountAxisX: PropTypes.number,
  /** The tickCountAxisY prop specifies approximately how many ticks should be drawn on the axis Y. */
  tickCountAxisY: PropTypes.number,
  /** The tickFormatAxisX prop specifies how tick values should be labeled. The tickFormat prop can be given as an array of values to display for each tick, or as a function to be applied to every tickValue */
  tickFormatAxisX: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  /** The tickValuesAxisX prop explicitly specifies a set of tick values to draw on the axis X. */
  tickValuesAxisX: PropTypes.arrayOf(PropTypes.number),
  /**
   The tickFormatAxisX prop specifies how tick values should be labeled.
   The tickFormat prop can be given as an array of values to display for each tick, or as a function to be applied to every tickValue.
  */
  tickFormatAxisY: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  /** The tickValuesAxisY prop explicitly specifies a set of tick values to draw on the axis Y. */
  tickValuesAxisY: PropTypes.arrayOf(PropTypes.number),
  /** The tickAxisYPrecision prop specifies fractional part for default values (unless we use custom tickFormatAxisY).
   For precision equals 3, numer 5 will be displayed as 5.000 and 5.1234 will be 5.123. Default value is 0 (integers) */
  tickAxisYPrecision: PropTypes.number,
}

export const defaultProps = {
  chartPadding: {
    top: 75,
    bottom: 45,
    left: 110,
    right: 35,
  },
  chartHeight: 400,
  domainAxisX: undefined,
  domainAxisY: undefined,
  labelsAxisX: [],
  linesColors: [
    COLORS.VIBRANT_CYAN,
    COLORS.VIBRANT_YELLOW,
    COLORS.VIBRANT_GREEN,
    COLORS.VIBRANT_MAGENTA,
    COLORS.RICH_PURPLE,
    COLORS.RICH_BLUE,
  ],
  lineSize: 5,
  mobileLineSize: 3,
  tickAxisYPrecision: 0,
  mobileChartPadding: {
    top: 45,
    bottom: 75,
    left: 75,
    right: 25,
  },
  tickCountAxisX: 4,
  tickCountAxisY: 6,
  tickFormatAxisX: defaultFormatter,
  tickValuesAxisX: null,
  tickFormatAxisY: defaultFormatter,
  tickValuesAxisY: null,
  tooltipLabelFormat: null,
}

LineGraph.propTypes = propTypes
LineGraph.defaultProps = defaultProps

const { Component } = attachClassName(LineGraph)

export default Component
