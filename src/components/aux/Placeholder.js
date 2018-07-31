import React from 'react'
import PropTypes from 'prop-types'

import PlaceholderImage from '~/assets/svgIllustrations/placeholder.svg'

const Placeholder = ({ size }) => (
  <PlaceholderImage
    width={`${size}px`}
    height={`${size}px`}
    style={{
      borderRadius: '50%',
    }}
  />
)

Placeholder.propTypes = {
  size: PropTypes.number,
}

Placeholder.defaultProps = {
  size: 150,
}

export default Placeholder
