import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { append, without, contains } from 'ramda'

import attachClassName from '../../components/misc/hoc/attachClassName'
import BarGroupsWrapper from '../../components/BarChart/BarGroupsWrapper'
import YTicks from '../../components/BarChart/YTicks'
import Labels from '../../components/misc/charts/Labels'
import { recomputeData, isMobile } from '../../components/BarChart/utils'
import { defaultFormatter } from '../../utils/charts'
import {
  TICKS_OFFSET,
  TICKS_LINE_HEIGHT,
} from '../../components/BarChart/consts'

const BarChartWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 100%;
  margin-top: ${TICKS_LINE_HEIGHT}px;
  padding-left: ${TICKS_OFFSET}px;
`

const BarChartLabelsWrapper = styled.div`
  margin-left: 20px;
`

const getBarWidth = () => (isMobile() ? 15 : 7)

export class BarChart extends PureComponent {
  static propTypes = {
    /** In a data point, `sum` is an optional custom sum - to be displayed below the corresponding chart section. */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.shape({
              name: PropTypes.string.isRequired,
              color: PropTypes.string,
            }).isRequired,
          }),
        ).isRequired,
        x: PropTypes.string.isRequired,
        sum: PropTypes.number,
      }),
    ).isRequired,
    /** Function for formatting the y axis values. */
    yTickFormatter: PropTypes.func,
    /** Function for formatting the x axis values - also used in the tooltip. */
    valueFormatter: PropTypes.func,
    /** Offset from top, in pixels. If set to 0, the highest bar will touch the top of the chart. */
    topOffset: PropTypes.number,
  }

  static defaultProps = {
    yTickFormatter: defaultFormatter,
    valueFormatter: defaultFormatter,
    topOffset: 20,
  }

  state = {
    data: [],
    labels: [],
    selectedLabelsIds: [],
    tooltipData: null,
    barWidth: getBarWidth(),
  }

  componentDidMount() {
    const { data } = this.props
    this.setState(recomputeData(data))
    window.addEventListener('resize', this.setBarWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setBarWidth)
  }

  resetTooltip = () => this.setState({ tooltipData: null })
  setTooltipData = tooltipData => () => {
    const currentTooltipId = this.state.tooltipData && this.state.tooltipData.id
    this.setState({
      tooltipData: currentTooltipId === tooltipData.id ? null : tooltipData,
    })
  }

  setBarWidth = () => {
    this.setState({ barWidth: getBarWidth() })
  }

  handleLabelClick = ({ id }) => () => {
    const { selectedLabelsIds } = this.state
    const isSelected = contains(id, selectedLabelsIds)
    this.setState({
      selectedLabelsIds: isSelected
        ? without([id], selectedLabelsIds)
        : append(id, selectedLabelsIds),
    })
  }

  render() {
    const {
      yTickFormatter,
      valueFormatter,
      topOffset,
      data: dataFromProps,
      ...props
    } = this.props
    const {
      data,
      labels,
      selectedLabelsIds,
      tooltipData,
      barWidth,
    } = this.state
    return (
      <BarChartWrapper {...props}>
        <YTicks
          data={data}
          tickFormatter={yTickFormatter}
          topOffset={topOffset}
        />
        <BarGroupsWrapper
          data={data}
          onBarClick={this.handleLabelClick}
          selectedLabelsIds={selectedLabelsIds}
          topOffset={topOffset}
          valueFormatter={valueFormatter}
          setTooltipData={this.setTooltipData}
          resetTooltip={this.resetTooltip}
          tooltipData={tooltipData}
          barWidth={barWidth}
        />
        <BarChartLabelsWrapper>
          <Labels
            labels={labels}
            onLabelClick={this.handleLabelClick}
            selectedLabelsIds={selectedLabelsIds}
          />
        </BarChartLabelsWrapper>
      </BarChartWrapper>
    )
  }
}

const { Component } = attachClassName(BarChart)

export default Component
