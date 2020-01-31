import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { prop, isEmpty, contains } from 'ramda'

import { BARS_WRAPPER_HEIGHT } from '../../components/BarChart/consts'
import BarChartTooltip from '../../components/BarChart/BarChartTooltip'
import { media } from '../../utils/styling'
import { isTouchDevice } from '../../utils/featureDetects'

const BAR_PADDING = 8

const BarGroupWrapper = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
`
const BarsWrapper = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  ${media.max.phone`
    margin-left: 20px;
    margin-right: 20px;
  `}
`
const SVGBarsWrapper = styled.svg`
  transform: scale(1, -1);
`

const BarPath = styled.path`
  cursor: pointer;
`

const LabelWrapper = styled.div`
  margin-top: 5px;
  opacity: 0.3;
  font-size: 12px;
`
const SumWrapper = styled.div.attrs({
  'data-test-value': 'bar-chart-sum-label',
})`
  display: inline-block;
  margin-top: 16px;
  padding: 7px 30px;
  font-size: 12px;
  font-weight: ${props => props.theme.fontWeight.black};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.sensitiveGrey.base};
  ${media.max.phone`
    padding: 7px 15px;
  `}
`

const unitsToPercent = units => (units * 100) / BARS_WRAPPER_HEIGHT
const valueToPercent = value => (value * BARS_WRAPPER_HEIGHT) / 100

const BarGroup = ({
  point,
  selectedLabelsIds,
  topOffset,
  valueFormatter,
  isInFirstGroup,
  isInLastGroup,
  setTooltipData,
  resetTooltip,
  tooltipData,
  barWidth,
  onBarClick,
}) => {
  const handleBarClick = (point, tooltipData) => onBarClick(point.label)
  const svgWidth = point.values.length * (barWidth + BAR_PADDING) - BAR_PADDING
  const sum =
    point.sum || point.values.reduce((acc, { value }) => acc + value, 0)
  const shouldDisplayTooltip =
    tooltipData && contains(tooltipData.id, point.values.map(prop('id')))
  return (
    <BarGroupWrapper>
      <BarsWrapper>
        <SVGBarsWrapper
          width={svgWidth}
          height={BARS_WRAPPER_HEIGHT}
          viewBox={`0 0 ${svgWidth} ${BARS_WRAPPER_HEIGHT}`}
        >
          {point.values.map((value, i) => {
            const x = i * (barWidth + BAR_PADDING)
            const x2 = x + barWidth
            const scale = 1 - unitsToPercent(topOffset) / 100
            const height = valueToPercent(value.valueAsPercentage * scale)
            const isDimmed =
              !isEmpty(selectedLabelsIds) &&
              !contains(value.label.id, selectedLabelsIds)
            const dataForTooltip = {
              x: x + barWidth / 2,
              y: BARS_WRAPPER_HEIGHT - height,
              value: valueFormatter(value.value),
              id: value.id,
              label: value.label,
            }
            const barPathProps = isTouchDevice()
              ? {
                  onClick: setTooltipData(dataForTooltip),
                }
              : {
                  onClick: handleBarClick(value, dataForTooltip),
                  onMouseEnter: setTooltipData(dataForTooltip),
                  onMouseLeave: resetTooltip,
                }
            return (
              <BarPath
                key={value.id}
                d={`
                      M ${x} 0
                      H ${x2}
                      V ${height - barWidth}
                      C
                        ${x2} ${height}
                        ${x2} ${height}
                        ${x} ${height}
                      V ${x}
                      Z
                    `}
                fill={value.label.color}
                style={{ opacity: isDimmed ? 0.2 : 1 }}
                {...barPathProps}
              />
            )
          })}
        </SVGBarsWrapper>
        {shouldDisplayTooltip && (
          <BarChartTooltip
            isLeftAligned={isInFirstGroup}
            isRightAligned={isInLastGroup}
            width={`${svgWidth}px`}
            tooltipData={tooltipData}
            resetTooltip={resetTooltip}
          />
        )}
      </BarsWrapper>
      <LabelWrapper>{point.x}</LabelWrapper>
      <SumWrapper>{valueFormatter(sum)}</SumWrapper>
    </BarGroupWrapper>
  )
}

BarGroup.propTypes = {
  point: PropTypes.object.isRequired,
  onBarClick: PropTypes.func.isRequired,
  selectedLabelsIds: PropTypes.array.isRequired,
  topOffset: PropTypes.number.isRequired,
  valueFormatter: PropTypes.func.isRequired,
  isInFirstGroup: PropTypes.bool.isRequired,
  isInLastGroup: PropTypes.bool.isRequired,
  setTooltipData: PropTypes.func.isRequired,
  resetTooltip: PropTypes.func.isRequired,
  tooltipData: PropTypes.object,
  barWidth: PropTypes.number.isRequired,
}
BarGroup.defaultProps = {
  tooltipData: null,
}

export default BarGroup
