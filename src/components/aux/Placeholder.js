import React from 'react'
import PropTypes from 'prop-types'

import PlaceholderImage from '~/graphics/svgIllustrations/placeholder.svg'

const Placeholder = ({
  size = 150,
}) =>
  <PlaceholderImage
    width={`${size}px`}
    height={`${size}px`}
    style={{
      borderRadius: '50%',
    }}
  />

Placeholder.propTypes = {
  size: PropTypes.number,
}

export default Placeholder
