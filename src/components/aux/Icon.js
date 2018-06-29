import React from 'react'
import PropTypes from 'prop-types'

import Favorite from '~/graphics/svgs/favorite.svg'
import CircleX from '~/graphics/svgs/circle-x.svg'
import Star from '~/graphics/svgs/star.svg'
import StarHalf from '~/graphics/svgs/star-half.svg'
import Dot from '~/graphics/svgs/dot.svg'
import DotHalf from '~/graphics/svgs/dot-half.svg'

const ICONS = {
  favorite: Favorite,
  circleX: CircleX,
  star: Star,
  starHalf: StarHalf,
  dot: Dot,
  dotHalf: DotHalf,
}

const Icon = ({
  name,
  size = 14,
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
