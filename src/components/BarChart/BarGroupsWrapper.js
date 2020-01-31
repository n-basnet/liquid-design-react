import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BarGroup from '../../components/BarChart/BarGroup'
import withHoverLine from '../../components/misc/hoc/withHoverLine'
import {
  BARS_WRAPPER_HEIGHT,
  TICKS_PADDING,
} from '../../components/BarChart/consts'

const BarGroupsContainer = styled.div`
  position: relative;
  display: inline-flex;
  overflow-x: scroll;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  max-width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 100px;
  margin-top: -100px;
`

const BarGroupsWrapperBase = ({ data, ...props }) => (
  <BarGroupsContainer>
    {data.map((point, i) => (
      <BarGroup
        key={point.id}
        point={point}
        {...props}
        isInFirstGroup={i === 0}
        isInLastGroup={i === data.length - 1}
      />
    ))}
  </BarGroupsContainer>
)

BarGroupsWrapperBase.propTypes = {
  data: PropTypes.array.isRequired,
}

const BarGroupsWrapper = withHoverLine(BarGroupsWrapperBase, {
  max: BARS_WRAPPER_HEIGHT,
  lineStyle: {
    marginLeft: `${TICKS_PADDING}px`,
    width: `calc(100% - ${TICKS_PADDING}px)`,
  },
})

export default BarGroupsWrapper
