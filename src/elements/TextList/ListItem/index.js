import React from 'react'
import PropTypes from 'prop-types'

export const ListItem = ({ name, children }) => (
  <li>
    {name}
    {children}
  </li>
)

ListItem.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
}

ListItem.defaultProps = {
  children: null,
}
