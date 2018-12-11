import React from 'react'

import { VictoryChart } from 'victory'

// This wrapper for VictoryChart fixes incorrect scaling for VictoryChart SVG wrapper
const IEFriendlyVictoryChart = props => (
  <div
    style={{
      position: 'relative',
      height: 0,
      width: '100%',
      padding: 0,
      paddingBottom: `${100 * (props.height / props.width)}%`,
    }}
  >
    <VictoryChart
      {...props}
      style={{
        ...props.style,
        parent: { position: 'absolute', height: '100%', width: '100%', left: 0, top: 0 },
      }}
    />
  </div>
)

IEFriendlyVictoryChart.propTypes = VictoryChart.propTypes

export default IEFriendlyVictoryChart
