import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  BARS_WRAPPER_HEIGHT,
  TICKS_OFFSET,
  TICKS_PADDING,
  TICKS_LINE_HEIGHT,
} from '../../components/BarChart/consts'
import { getTicks } from '../../components/BarChart/utils'

const YTicksContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% + ${TICKS_OFFSET}px);
  height: ${BARS_WRAPPER_HEIGHT}px;
`

const SpreadWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-end;
`

const TickValuesWrapper = styled(SpreadWrapper)`
  position: absolute;
  left: 0;
  top: -${TICKS_LINE_HEIGHT / 2}px;
  height: calc(100% + ${TICKS_LINE_HEIGHT}px);
`

const TickLinesWrapper = styled(SpreadWrapper)`
  height: 100%;
  width: calc(100% - ${TICKS_OFFSET}px);
  padding-left: ${TICKS_PADDING}px;
`

const TickLine = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px ${props => (props.isSolid ? 'solid' : 'dashed')}
    ${props => props.theme.colors.sensitiveGrey.dark};
`

const SingleTick = styled.div`
  opacity: 0.3;
  font-size: 12px;
`

const YTicks = ({ data, tickFormatter, topOffset }) => {
  // converting topOffset from pixels to percent
  const ticks = getTicks(data, (topOffset * 100) / BARS_WRAPPER_HEIGHT)
  return (
    <YTicksContainer>
      <TickValuesWrapper>
        {ticks.map((value, i) => (
          <SingleTick key={i}>{tickFormatter(value)}</SingleTick>
        ))}
      </TickValuesWrapper>
      <TickLinesWrapper>
        {ticks.map((value, i) => (
          <TickLine key={i} isSolid={i === 0} />
        ))}
      </TickLinesWrapper>
    </YTicksContainer>
  )
}

YTicks.propTypes = {
  data: PropTypes.array.isRequired,
  tickFormatter: PropTypes.func.isRequired,
  topOffset: PropTypes.number.isRequired,
}

export default YTicks
