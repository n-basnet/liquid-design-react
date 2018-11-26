import React from 'react'
import PropTypes from 'prop-types'

import { Rect, VictoryLabel } from 'victory'

import COLORS from '~/utils/consts/colors'

const { WHITE } = COLORS

export const CustomLabel = ({ text, style, isMobile, ...props }) => (
  <g>
    <Rect
      width={isMobile ? 8 : text.length * 12}
      height={15}
      style={{ fill: WHITE }}
      transform='translate(-10 -16)'
      {...props}
    />
    <VictoryLabel dx={0} text={text} style={style} {...props} />
  </g>
)

CustomLabel.propTypes = {
  isMobile: PropTypes.bool,
  text: PropTypes.string,
  style: PropTypes.object,
}

CustomLabel.defaultProps = {
  isMobile: false,
  text: undefined,
  style: null,
}
