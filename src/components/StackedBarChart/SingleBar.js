import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme, css } from 'styled-components'
import { find, prop } from 'ramda'

import { GLOBAL_CSS_PREFIX } from '~/utils/consts'
import { normaliseValues, sortByLabels, sumHeights } from '~/components/StackedBarChart/utils'
import {
  BAR_WIDTH,
  BAR_SIDE_OFFSET,
  ROUDED_RADIUS,
  UNSELECTED_OPACITY,
  SELECTED_SCALE,
  BAR_SIDE_MARGIN,
  OVERLAY_X_SHIFT,
} from '~/components/StackedBarChart/consts'
import InfoOverlay from '~/components/StackedBarChart/InfoOverlay'

const SCALE_FLIP = `scale(1, -1)`

const SingleBarWrapper = styled.div`
  position: relative;
  margin-right: ${BAR_SIDE_MARGIN}px;
  margin-left: ${props => (props.withOffsetLeft ? OVERLAY_X_SHIFT : 0)}px;
`

const MainSVG = styled.svg`
  transform: ${SCALE_FLIP};
`

const NameWrapper = styled.div`
  margin-top: 16px;
  font-size: 12px;
  text-align: center;
  color: ${props => props.theme.colors.richBlack.lightest};
`

const DataRect = styled.rect`
  cursor: pointer;
  transition: transform 200ms opacity 200ms;
  transform-origin: 50% 50%;
  ${props =>
    props.isDimmed &&
    css`
      opacity: ${UNSELECTED_OPACITY};
    `}
  transform: ${props => `scale(${props.isSelected ? SELECTED_SCALE : 1}, 1)`};
`

export const SingleBar = ({
  theme,
  width,
  height,
  point,
  topPadding,
  handleDataRectClick,
  selectedPointData,
  resetSelectedPointId,
  index,
}) => {
  const barHeight = (point.percentageHeight * (height - topPadding)) / 100

  const points = normaliseValues(point.values)
    .sort(sortByLabels)
    // reversing because the whole SVG will be flipped vertically
    .reverse()
    .map(point => ({
      height: (point.percentValue * barHeight) / 100,
      ...point,
    }))

  const rectProps = {
    x: 0,
    y: 0,
    width,
    height,
  }

  const maskId = `${GLOBAL_CSS_PREFIX}mask__${point.id}`

  const selectedPoint = find(({ id }) => id === prop('id', selectedPointData), points)
  const isActive = !selectedPointData || selectedPoint

  return (
    <SingleBarWrapper withOffsetLeft={selectedPoint && index === 0}>
      <MainSVG viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <defs>
          <mask id={maskId}>
            <rect
              {...rectProps}
              y={rectProps.y - ROUDED_RADIUS}
              width={BAR_WIDTH + BAR_SIDE_OFFSET}
              height={points.reduce(sumHeights, 0) + ROUDED_RADIUS}
              fill='white'
              rx={ROUDED_RADIUS}
            />
          </mask>
        </defs>
        <rect
          {...rectProps}
          fill={theme.colors.sensitiveGrey.base}
          rx={6}
          style={{ opacity: isActive ? 1 : UNSELECTED_OPACITY }}
        />
        <g>
          {points.map((rectValuePoint, i) => {
            const heightOfPointsBefore = i === 0 ? 0 : points.slice(0, i).reduce(sumHeights, 0)
            const isSelected = prop('id', selectedPointData) === rectValuePoint.id
            return (
              <DataRect
                key={rectValuePoint.id}
                onClick={handleDataRectClick({
                  id: rectValuePoint.id,
                  parentPointId: point.id,
                  y: heightOfPointsBefore,
                  height: rectValuePoint.height,
                })}
                x={BAR_SIDE_OFFSET}
                y={heightOfPointsBefore}
                width={BAR_WIDTH}
                height={rectValuePoint.height}
                fill={rectValuePoint.label.color}
                isSelected={isSelected}
                isDimmed={selectedPointData && !isSelected}
                mask={`url(#${maskId})`}
              />
            )
          })}
        </g>
      </MainSVG>
      {selectedPoint && (
        <InfoOverlay
          selectedPoint={selectedPoint}
          selectedPointData={selectedPointData}
          height={height}
          barContainerWidth={width}
          resetSelectedPointId={resetSelectedPointId}
          index={index}
        />
      )}
      <NameWrapper>{point.name}</NameWrapper>
    </SingleBarWrapper>
  )
}

SingleBar.propTypes = {
  theme: PropTypes.object.isRequired,
  point: PropTypes.shape({
    values: PropTypes.array.isRequired,
    sum: PropTypes.number.isRequired,
    percentageHeight: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  topPadding: PropTypes.number.isRequired,
  handleDataRectClick: PropTypes.func.isRequired,
  resetSelectedPointId: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  selectedPointData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentPointId: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
}

SingleBar.defaultProps = {
  selectedPointData: null,
}

export default withTheme(SingleBar)
