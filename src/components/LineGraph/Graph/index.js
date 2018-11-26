import React, { Component } from 'react'

import { withTheme } from 'styled-components'
import {
  VictoryAxis,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'

import IEVictoryChart from '~/components/LineGraph/CustomVictoryChart'
import { CustomFlyout } from '~/components/LineGraph/CustomFlyout'
import { CustomLabel } from '~/components/LineGraph/CustomLabel'
import COLORS from '~/utils/consts/colors'
import {
  CHART_PIXEL_PADDING,
  CHART_PIXEL_WIDTH,
  DATA_POINT_SIZE,
  MOBILE_CHART_PIXEL_PADDING,
} from '~/components/LineGraph/consts'
import { isMobile, isIE11 } from '~/components/LineGraph/utils'
import { defaultProps, propTypes } from '~/components/LineGraph'
import max from 'lodash/max'

const { WHITE } = COLORS
export class Graph extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    dataSet: this.props.data,
  }

  tickLabelStyle = {
    fontFamily: this.props.theme.fontFamily,
    fontSize: 12,
    letterSpacing: 0.2,
    fill: this.props.theme.colors.richBlack.base,
    fillOpacity: 0.3,
  }

  tooltipLabelStyle = {
    fontSize: this.props.theme.fontSize.h6,
    fontWeight: this.props.theme.fontWeight.bold,
    fill: this.props.theme.colors.richBlack.base,
  }

  renderLines = () =>
    this.props.data.map((d, i) => (
      <VictoryGroup key={`group-${i}`}>
        <VictoryLine
          groupComponent={<g />}
          data={d}
          interpolation='natural'
          name={`line-${i}`}
          style={{
            data: {
              stroke: this.getColorOnScale(i),
              strokeWidth: isMobile() ? this.props.mobileLineSize : this.props.lineSize,
              strokeLinecap: 'round',
            },
          }}
        />
        <VictoryScatter
          data={d}
          name={`dataPoints-${i}`}
          size={(d, active) => {
            return active ? DATA_POINT_SIZE : 0
          }}
          style={{
            data: { fill: this.getColorOnScale(i), stroke: WHITE, strokeWidth: 2 },
            labels: {
              ...this.tooltipLabelStyle,
            },
          }}
        />
      </VictoryGroup>
    ))

  // lines are blacklisted in order to allow the VictoryVoronoiContainer to use only data points values
  blacklistLines = () => this.props.data.map((d, i) => `line-${i}`)

  getColorOnScale = index => {
    const { linesColors } = this.props
    const { base } = this.props.theme.colors.primary

    const startIndex = (linesColors && linesColors.indexOf(base)) || 0

    return linesColors[(startIndex + index) % linesColors.length]
  }

  getZoomScale = () =>
    Math.min(CHART_PIXEL_WIDTH, Math.max(...this.props.data.map(array => array.length)))

  formatLabel = (y, unit, index = 0) => {
    const { tickFormatAxisY } = this.props

    // removes duplicated labels in Tooltips
    if (index > 0) return null

    if (Array.isArray(tickFormatAxisY)) return tickFormatAxisY
    if (typeof tickFormatAxisY === 'function') return tickFormatAxisY(y)

    const suffix = unit ? ` ${unit}` : ''
    return `${y.toFixed(this.props.tickAxisYPrecision)}${suffix}`
  }

  // checks if actual X position exceeds 85% (0.85) of whole chart
  isRightAligned = (x, data) => {
    const allDataSeriesMaxLength = max(data.map(arr => arr.length))
    return x / allDataSeriesMaxLength > 0.85
  }

  // sets custom X offset for tooltips that areclose to right side,
  // so they're placed top-left instead of top-center
  getTooltipXOffset = datum =>
    this.isRightAligned(datum.x, this.props.data) ? (isMobile() ? -28 : -32) : 0

  render() {
    const {
      chartPadding,
      chartWidth,
      chartHeight,
      domainAxisX,
      domainAxisY,
      labelsAxisX,
      mobileChartPadding,
      mobileLabelsAxisX,
      theme: { colors },
      tickCountAxisX,
      tickCountAxisY,
      tickFormatAxisX,
      tickValuesAxisX,
      tickValuesAxisY,
      unit,
    } = this.props

    const CustomVictoryChart = isIE11 ? IEVictoryChart : VictoryChart

    return (
      <CustomVictoryChart
        events={[
          {
            target: 'parent',
            eventHandlers: isMobile()
              ? {
                onMouseOver: () => null,
                onMouseOut: () => null,

                onClick: () => ({
                  target: 'data',
                  childName: 'scatter',
                }),
              }
              : {
                onMouseLeave: () => null,
                onClick: () => null,
              },
          },
        ]}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiBlacklist={this.blacklistLines()}
            allowPan
            responsive={false}
            allowZoom={false}
            activateLabels
            labels={(point, index) => this.formatLabel(point.y, unit, index)}
            labelComponent={
              <VictoryTooltip
                dy={18}
                dx={datum => this.getTooltipXOffset(datum)}
                flyoutComponent={<CustomFlyout />}
                labelComponent={
                  <VictoryLabel
                    lineHeight={1.6}
                    style={{ fontFamily: this.props.theme.fontFamily, fontWeight: 900 }}
                  />
                }
                orientation='top'
                pointerLength={5}
                flyoutStyle={{
                  stroke: colors.sensitiveGrey.dark,
                  fill: colors.white.base,
                }}
              />
            }
          />
        }
        domainPadding={{ x: 5, y: 15 }}
        singleQuadrantDomainPadding={false}
        padding={isMobile() ? mobileChartPadding : chartPadding}
        width={chartWidth}
        height={chartHeight}
        style={{
          padding: 0,
        }}
      >
        <VictoryAxis
          domain={domainAxisX}
          offsetY={isMobile() ? 44 : 25}
          tickCount={tickCountAxisX}
          tickLabelComponent={
            <CustomLabel
              dy={isMobile() ? 0 : -16}
              isMobile={isMobile()}
              verticalAnchor='start'
              textAnchor='start'
              unit={unit}
              style={{ ...this.tickLabelStyle }}
            />
          }
          tickFormat={tickFormatAxisX}
          tickValues={tickValuesAxisX}
          style={{
            axis: { stroke: '#d1d1d1' },
          }}
        />
        <VictoryLabel
          text={isMobile() ? mobileLabelsAxisX[0] : labelsAxisX[0]}
          x={isMobile() ? MOBILE_CHART_PIXEL_PADDING.left : CHART_PIXEL_PADDING.left}
          y={chartHeight - 10}
          textAnchor='start'
          dx={4}
          width={10}
          style={{ ...this.tickLabelStyle }}
        />
        {!isMobile() && (
          <VictoryLabel
            text={labelsAxisX[1]}
            x={chartWidth - CHART_PIXEL_PADDING.right}
            y={chartHeight - 10}
            textAnchor='end'
            style={{ ...this.tickLabelStyle }}
          />
        )}
        <VictoryAxis
          dependentAxis
          crossAxis={false}
          domain={domainAxisY}
          tickCount={tickCountAxisY}
          tickFormat={t => this.formatLabel(t, unit)}
          tickValues={tickValuesAxisY}
          tickLabelComponent={
            <VictoryLabel textAnchor='end' transform={`translate(${isMobile() ? 5 : -15} 0)`} />
          }
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: {
              ...this.tickLabelStyle,
            },
          }}
        />
        {this.renderLines()}
      </CustomVictoryChart>
    )
  }
}

export default withTheme(Graph)
