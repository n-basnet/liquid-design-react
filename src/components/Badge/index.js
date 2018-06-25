import React from 'react'
import PropTypes from 'prop-types'

export const Badge = ({
  text
}) =>
  <div>
    {text}
  </div>

Badge.propTypes = {
  text: PropTypes.string.isRequired
}
