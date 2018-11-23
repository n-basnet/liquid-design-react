import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { toPairs, omit } from 'ramda'
import enhanceWithClickOutside from 'react-click-outside'

import { GLOBAL_CSS_PREFIX } from '~/utils/consts'
import { ROUDED_RADIUS, OVERLAY_X_SHIFT } from '~/components/StackedBarChart/consts'
import SVGCloseCircle from '~/utils/svg/SVGCloseCircle'
import Ellipsis from '~/components/aux/Ellipsis'
import SVGShadowFilter from '~/utils/svg/SVGShadowFilter'

const DATA_TOOLTIP_ROW_HEIGHT = 32
const INFO_RECT_WIDTH = 190
const RECT_X = 65
const CLOSE_CIRCLE_RADIUS = 20
const RECT_TEXT_PADDING = { x: 15, y: 8 }
const TRIANGLE_SIZE = 8
const CLOSE_CIRCLE_PADDING = 6
const INFO_SVG_WIDTH = 300

const OverlaySVG = styled.svg.attrs({
  'data-test-value': 'stacked-bar-overlay',
})`
  position: absolute;
  z-index: 1;
  top: 0;
  left: ${props => props.left}px;
  pointer-events: none;
  overflow: visible;
  > * {
    pointer-events: all;
  }
`

const DataTooltipWrapper = styled.div`
  position: absolute;
  z-index: 1;
  ${props =>
    !props.disableArrow &&
    css`
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: ${props => props.elementHeight / 2 - TRIANGLE_SIZE}px;
    ${props => {
    const side = props.alignedToLeft ? 'right' : 'left'
    const borderForTriangle = props.alignedToLeft ? 'left' : 'right'
    return css`
          ${side}: ${-TRIANGLE_SIZE - RECT_TEXT_PADDING.x + 1}px;
          border-${borderForTriangle}: ${TRIANGLE_SIZE}px solid #fff;
        `
  }} border-top: ${TRIANGLE_SIZE}px solid #0000;
    border-bottom: ${TRIANGLE_SIZE}px solid #0000;
  }
  `}
  width: ${props => props.elementWidth}px;
  span {
    font-size: 12px;
  }
  b {
    font-size: 14px;
    font-weight: ${props => props.theme.fontWeight.black};
  }
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }
  tr {
    height: ${DATA_TOOLTIP_ROW_HEIGHT}px;
  }
  td {
    &:first-child {
      width: 49px;
    }
  }
`

@enhanceWithClickOutside
class DataTooltip extends PureComponent {
  static propTypes = { resetSelectedPointId: PropTypes.func.isRequired }
  handleClickOutside = this.props.resetSelectedPointId
  render() {
    const { resetSelectedPointId, ...props } = this.props
    return <DataTooltipWrapper {...props} />
  }
}

const InfoOverlay = ({
  selectedPoint,
  selectedPointData,
  height,
  resetSelectedPointId,
  barContainerWidth,
  index,
}) => {
  const filterId = `${GLOBAL_CSS_PREFIX}Filter__${selectedPoint.id}`

  const tooltipData = toPairs({
    label: selectedPoint.label.name,
    ...omit(['height', 'id', 'percentValue', 'label'], selectedPoint),
  })
  const selectedPointHalfY = selectedPointData.y + selectedPointData.height / 2
  const infoRectHeight = tooltipData.length * DATA_TOOLTIP_ROW_HEIGHT + RECT_TEXT_PADDING.y * 2

  // the info rect should be placed either aligned to the bottom of the close circle,
  // or - if it's middle would be above the data rect - aligned to the center
  const rectYBase = height - selectedPointHalfY
  const rectYCenterAligned = rectYBase - infoRectHeight / 2
  const rectYBottomAligned = rectYBase - infoRectHeight + CLOSE_CIRCLE_RADIUS
  const yOfDataPointTop = selectedPointData.y + selectedPointData.height
  const yOfInfoRectMiddle = height - (rectYBottomAligned + infoRectHeight / 2)
  const threshold = 5
  const isBottomAlignOutisdeDataRect = yOfInfoRectMiddle - yOfDataPointTop > -threshold

  // is the triangle arrow pointing in the area of the data point rect
  const isArrowOutsideRect = yOfDataPointTop < infoRectHeight / 2

  const maxRectY = height - infoRectHeight
  const rectY = Math.min(
    maxRectY,
    isBottomAlignOutisdeDataRect ? rectYCenterAligned : rectYBottomAligned
  )

  const spaceBelowInfoRect = height - (rectY + infoRectHeight)
  const circleWithPaddingHeight = CLOSE_CIRCLE_RADIUS * 2 + CLOSE_CIRCLE_PADDING * 2
  const doesCircleFitBelow = spaceBelowInfoRect >= circleWithPaddingHeight

  const isMobileView = window.innerWidth < 450
  const alignedToLeft = isMobileView && index >= 3

  const aboveInfoRect = rectY - CLOSE_CIRCLE_RADIUS - CLOSE_CIRCLE_PADDING

  let circleTranslateY = height - Math.max(CLOSE_CIRCLE_RADIUS, selectedPointHalfY)
  if (alignedToLeft) {
    if (doesCircleFitBelow) {
      circleTranslateY += infoRectHeight / 2 + CLOSE_CIRCLE_RADIUS + CLOSE_CIRCLE_PADDING
    } else {
      circleTranslateY = aboveInfoRect
    }
  }
  const leftShift = alignedToLeft ? -INFO_RECT_WIDTH - barContainerWidth + 12 : -OVERLAY_X_SHIFT

  return (
    <Fragment>
      <OverlaySVG
        viewBox={`0 0 ${INFO_SVG_WIDTH} ${height}`}
        width={INFO_SVG_WIDTH}
        height={height}
        left={leftShift}
      >
        <defs>
          <SVGShadowFilter id={filterId} spread={5} opacity={0.2} />
        </defs>
        <rect
          x={RECT_X}
          y={rectY}
          rx={ROUDED_RADIUS}
          width={INFO_RECT_WIDTH}
          height={infoRectHeight}
          fill='white'
          filter={`url(#${filterId})`}
        />
        <SVGCloseCircle
          transform={`translate(${
            alignedToLeft ? RECT_X + INFO_RECT_WIDTH - CLOSE_CIRCLE_RADIUS : CLOSE_CIRCLE_RADIUS + 3
          } ${circleTranslateY})`}
          radius={CLOSE_CIRCLE_RADIUS}
          style={{ cursor: 'pointer' }}
          onClick={resetSelectedPointId}
          filter={`url(#${filterId})`}
        />
      </OverlaySVG>
      <DataTooltip
        style={{
          top: rectY + RECT_TEXT_PADDING.y,
          left: RECT_X + leftShift + RECT_TEXT_PADDING.x,
        }}
        elementWidth={INFO_RECT_WIDTH - RECT_TEXT_PADDING.x * 2}
        elementHeight={infoRectHeight - RECT_TEXT_PADDING.y * 2}
        alignedToLeft={alignedToLeft}
        resetSelectedPointId={resetSelectedPointId}
        disableArrow={isArrowOutsideRect}
      >
        <table>
          <tbody>
            {tooltipData.map(([name, value], i) => (
              <tr key={i}>
                <td>
                  <span>
                    <Ellipsis>{name}</Ellipsis>
                  </span>
                </td>
                <td colSpan={2}>
                  <b>
                    <Ellipsis>{value}</Ellipsis>
                  </b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTooltip>
    </Fragment>
  )
}

InfoOverlay.propTypes = {
  selectedPoint: PropTypes.object.isRequired,
  selectedPointData: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  resetSelectedPointId: PropTypes.func.isRequired,
  barContainerWidth: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

export default InfoOverlay
