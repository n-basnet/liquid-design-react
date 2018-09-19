import React from 'react'
import PropTypes from 'prop-types'

import PlaceholderSVGImage from '~/assets/svgIllustrations/placeholder.svg'
import PlaceholderSVGImageWhite from '~/assets/svgIllustrations/placeholder-white.svg'

const Placeholder = ({ size, white }) => {
  const SVGImage = white ? PlaceholderSVGImageWhite : PlaceholderSVGImage
  return (
    <SVGImage
      width={`${size}px`}
      height={`${size}px`}
      style={{
        borderRadius: '50%',
      }}
    />
  )
}

Placeholder.propTypes = {
  size: PropTypes.number,
  white: PropTypes.bool,
}

Placeholder.defaultProps = {
  size: 150,
  white: false,
}

export default Placeholder
