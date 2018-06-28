import React from 'react'
import PropTypes from 'prop-types'

import Favorite from '~/graphics/svgs/favorite.svg'

const ICONS = {
  favorite: Favorite,
}

const Icon = ({
  name,
  size = 20,
  style = {},
}) => {
  const SVGIconComponent = ICONS[name]
  return (
    <SVGIconComponent
      width={`${size}px`}
      height={`${size}px`}
      style={style}
    />
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
}

export default Icon
