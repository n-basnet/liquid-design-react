import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import enhanceWithClickOutside from 'react-click-outside'

import { SingleLabel } from '~/components/aux/charts/Labels'

const TOOLTIP_WIDTH = 175
const TOOLTIP_HEIGHT = 68
const TOOLTIP_BOTTOM_MARGIN = 15
const TOOLTIP_ARROW_SIZE = 10
const TooltipWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  pointer-events: none;
`
const Tooltip = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: ${TOOLTIP_WIDTH}px;
  height: ${TOOLTIP_HEIGHT}px;
  ${props =>
    !props.isLeftAligned &&
    !props.isRightAligned &&
    css`
      transform: translateX(-${TOOLTIP_WIDTH / 2}px);
    `}
  padding: 15px;
  text-align: left;
  background-color: ${props => props.theme.colors.white.base};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  &:after {
    content: '';
    position: absolute;
    ${props =>
    props.isLeftAligned
      ? css`
            left: ${TOOLTIP_ARROW_SIZE}px;
          `
      : props.isRightAligned
        ? css`
            right: ${TOOLTIP_ARROW_SIZE}px;
          `
        : css`
            left: 0;
            right: 0;
          `}
    width: 0;
    height: ${TOOLTIP_ARROW_SIZE}px;
    bottom: -${TOOLTIP_ARROW_SIZE}px;
    box-sizing: border-box;
    margin: auto;
    border-top: ${TOOLTIP_ARROW_SIZE}px solid ${props => props.theme.colors.white.base};
    border-right: ${TOOLTIP_ARROW_SIZE}px solid transparent;
    border-left: ${TOOLTIP_ARROW_SIZE}px solid transparent;
  }
`

const TooltipValueWrapper = styled.div`
  font-size: 14px;
  font-weight: ${props => props.theme.fontWeight.black};
`

const Label = styled(SingleLabel)`
  > div {
    margin-right: 6px;
  }
`

const getLeftOffset = ({ x, isLeftAligned, isRightAligned }) => {
  if (isLeftAligned) {
    return x - TOOLTIP_ARROW_SIZE * 2
  } else if (isRightAligned) {
    return x - TOOLTIP_WIDTH + TOOLTIP_ARROW_SIZE * 2
  }
  return x
}

@enhanceWithClickOutside
class BarChartTooltip extends PureComponent {
  static propTypes = {
    width: PropTypes.string.isRequired,
    tooltipData: PropTypes.object.isRequired,
    isLeftAligned: PropTypes.bool.isRequired,
    isRightAligned: PropTypes.bool.isRequired,
    resetTooltip: PropTypes.func.isRequired,
  }
  handleClickOutside = this.props.resetTooltip
  render() {
    const { width, tooltipData, isLeftAligned, isRightAligned } = this.props
    return (
      <TooltipWrapper style={{ width }}>
        <Tooltip
          isLeftAligned={isLeftAligned}
          isRightAligned={isRightAligned}
          style={{
            top: `${tooltipData.y - TOOLTIP_HEIGHT - TOOLTIP_BOTTOM_MARGIN}px`,
            left: getLeftOffset({ x: tooltipData.x, isLeftAligned, isRightAligned }),
          }}
        >
          <Label {...tooltipData.label} />
          <TooltipValueWrapper>{tooltipData.value}</TooltipValueWrapper>
        </Tooltip>
      </TooltipWrapper>
    )
  }
}

export default BarChartTooltip
