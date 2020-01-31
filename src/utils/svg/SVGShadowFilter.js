import React from 'react'
import PropTypes from 'prop-types'

const SVGShadowFilter = ({ id, spread, opacity }) => (
  <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
    <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
    <feGaussianBlur result="blurOut" in="offOut" stdDeviation={spread} />
    <feComponentTransfer>
      <feFuncA type="linear" slope={opacity} />
    </feComponentTransfer>
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
)

SVGShadowFilter.propTypes = {
  id: PropTypes.string.isRequired,
  spread: PropTypes.number,
  opacity: PropTypes.number,
}

SVGShadowFilter.defaultProps = {
  spread: 2.5,
  opacity: 0.15,
}

export default SVGShadowFilter
