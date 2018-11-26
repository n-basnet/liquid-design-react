import React from 'react'
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
import { max } from 'ramda'

import IEVictoryChart from '~/components/LineGraph/CustomVictoryChart'
import { CustomFlyout } from '~/components/LineGraph/CustomFlyout'
import { CustomLabel } from '~/components/LineGraph/CustomLabel'
import COLORS from '~/utils/consts/colors'
import { isMobile, isIE11 } from '~/components/LineGraph/utils'
import { defaultProps, propTypes } from '~/components/LineGraph'

const { WHITE } = COLORS

const DATA_POINT_SIZE = 5

export const Graph = props => {
  const {
    chartPadding,
    chartWidth,
    chartHeight,
    domainAxisX,
    domainAxisY,
    labelsAxisX,
    mobileChartPadding,
    theme,
    tickCountAxisX,
    tickCountAxisY,
    tickFormatAxisX,
    tickValuesAxisX,
    tickFormatAxisY,
    tickValuesAxisY,
    data,
    linesColors,
    mobileLineSize,
    lineSize,
  } = props

  const isMobileSize = isMobile()

  const tickLabelStyle = {
    fontFamily: theme.fontFamily,
    fontSize: 12,
    letterSpacing: 0.2,
    fill: theme.colors.richBlack.base,
    fillOpacity: 0.3,
  }

  const tooltipLabelStyle = {
    fontSize: theme.fontSize.h6,
    fontWeight: theme.fontWeight.bold,
    fill: theme.colors.richBlack.base,
  }

  const getColorOnScale = index => {
    const startIndex = (linesColors && linesColors.indexOf(theme.colors.primary.base)) || 0
    return linesColors[(startIndex + index) % linesColors.length]
  }

  const renderLines = () =>
    data.map((d, i) => (
      <VictoryGroup key={`group-${i}`}>
        <VictoryLine
          groupComponent={<g />}
          data={d}
          interpolation='natural'
          name={`line-${i}`}
          style={{
            data: {
              stroke: getColorOnScale(i),
              strokeWidth: isMobileSize ? mobileLineSize : lineSize,
              strokeLinecap: 'round',
            },
          }}
        />
        <VictoryScatter
          data={d}
          name={`dataPoints-${i}`}
          size={(d, active) => (active ? DATA_POINT_SIZE : 0)}
          style={{
            data: { fill: getColorOnScale(i), stroke: WHITE, strokeWidth: 2 },
            labels: tooltipLabelStyle,
          }}
        />
      </VictoryGroup>
    ))

  // lines are blacklisted in order to allow the VictoryVoronoiContainer to use only data points values
  const getBlacklistedLines = () => data.map((d, i) => `line-${i}`)

  const formatLabel = (y, index = 0) => {
    // removes duplicated labels in Tooltips
    if (index > 0) return null
    return typeof tickFormatAxisY === 'function' ? tickFormatAxisY(y) : tickFormatAxisY
  }

  // checks if actual X position exceeds 85% (0.85) of whole chart
  const isRightAligned = (x, data) => {
    const allDataSeriesMaxLength = max(...data.map(arr => arr.length))
    return x / allDataSeriesMaxLength > 0.85
  }

  // sets custom X offset for tooltips that areclose to right side,
  // so they're placed top-left instead of top-center
  const getTooltipXOffset = datum =>
    isRightAligned(datum.x, data) ? (isMobileSize ? -28 : -32) : 0

  const CustomVictoryChart = isIE11 ? IEVictoryChart : VictoryChart

  return (
    <CustomVictoryChart
      events={[
        {
          target: 'parent',
          eventHandlers: isMobileSize
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
          voronoiBlacklist={getBlacklistedLines()}
          allowPan
          responsive={false}
          allowZoom={false}
          activateLabels
          labels={(point, index) => formatLabel(point.y, index)}
          labelComponent={
            <VictoryTooltip
              dy={18}
              dx={getTooltipXOffset}
              flyoutComponent={<CustomFlyout />}
              labelComponent={
                <VictoryLabel
                  lineHeight={1.6}
                  style={{ fontFamily: theme.fontFamily, fontWeight: 900 }}
                />
              }
              orientation='top'
              pointerLength={5}
              flyoutStyle={{
                stroke: theme.colors.sensitiveGrey.dark,
                fill: theme.colors.white.base,
              }}
            />
          }
        />
      }
      domainPadding={{ x: 5, y: 15 }}
      singleQuadrantDomainPadding={false}
      padding={isMobileSize ? mobileChartPadding : chartPadding}
      width={chartWidth}
      height={chartHeight}
      style={{
        padding: 0,
      }}
    >
      <VictoryAxis
        domain={domainAxisX}
        offsetY={isMobileSize ? 44 : 25}
        tickCount={tickCountAxisX}
        tickLabelComponent={
          <CustomLabel
            dy={isMobileSize ? 0 : -16}
            isMobile={isMobileSize}
            verticalAnchor='start'
            textAnchor='start'
            style={tickLabelStyle}
          />
        }
        tickFormat={tickFormatAxisX}
        tickValues={tickValuesAxisX}
        style={{
          axis: { stroke: '#d1d1d1' },
        }}
      />
      <VictoryLabel
        text={labelsAxisX[0]}
        x={isMobileSize ? mobileChartPadding.left : chartPadding.left}
        y={chartHeight - 10}
        textAnchor='start'
        dx={4}
        width={10}
        style={tickLabelStyle}
      />
      {!isMobileSize && (
        <VictoryLabel
          text={labelsAxisX[1]}
          x={chartWidth - chartPadding.right}
          y={chartHeight - 10}
          textAnchor='end'
          style={tickLabelStyle}
        />
      )}
      <VictoryAxis
        dependentAxis
        crossAxis={false}
        domain={domainAxisY}
        tickCount={tickCountAxisY}
        tickFormat={t => formatLabel(t)}
        tickValues={tickValuesAxisY}
        tickLabelComponent={
          <VictoryLabel textAnchor='end' transform={`translate(${isMobileSize ? 5 : -15} 0)`} />
        }
        style={{
          axis: { stroke: 'transparent' },
          tickLabels: tickLabelStyle,
        }}
      />
      {renderLines()}
    </CustomVictoryChart>
  )
}

Graph.propTypes = propTypes
Graph.defaultProps = defaultProps

export default withTheme(Graph)
