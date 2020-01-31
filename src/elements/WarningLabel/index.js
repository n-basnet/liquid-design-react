import React from 'react'
import PropTypes from 'prop-types'

import attachClassName from '../../components/misc/hoc/attachClassName'
import CompressedGas from '../../assets/svgIllustrations/warningLabels/CompressedGas.svg'
import Corrosive from '../../assets/svgIllustrations/warningLabels/Corrosive.svg'
import EnvironmentalHazard from '../../assets/svgIllustrations/warningLabels/EnvironmentalHazard.svg'
import Explosive from '../../assets/svgIllustrations/warningLabels/Explosive.svg'
import Flammable from '../../assets/svgIllustrations/warningLabels/Flammable.svg'
import Harmful from '../../assets/svgIllustrations/warningLabels/Harmful.svg'
import Health from '../../assets/svgIllustrations/warningLabels/Health hazard.svg'
import Oxidizing from '../../assets/svgIllustrations/warningLabels/Oxidizing.svg'
import Toxic from '../../assets/svgIllustrations/warningLabels/Toxic.svg'

export const WARNING_LABELS_FILES = {
  CompressedGas,
  Corrosive,
  EnvironmentalHazard,
  Explosive,
  Flammable,
  Harmful,
  Health,
  Oxidizing,
  Toxic,
}

export const DEFAULT_WIDTH = 90

export const WarningLabel = ({ name, width, height, style, ...props }) => {
  const Component = WARNING_LABELS_FILES[name]
  return (
    <Component
      width={width}
      viewBox={`0 0 ${DEFAULT_WIDTH} ${DEFAULT_WIDTH}`}
      style={{ maxWidth: '100%', height: height || 'auto', ...style }}
      {...props}
    />
  )
}

WarningLabel.propTypes = {
  name: PropTypes.oneOf(Object.keys(WARNING_LABELS_FILES)).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
}

WarningLabel.defaultProps = {
  width: DEFAULT_WIDTH,
  height: null,
  style: {},
}

const { Component } = attachClassName(WarningLabel)

export default Component
