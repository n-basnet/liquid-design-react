import PropTypes from 'prop-types'

export const tabsPropTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.number.isRequired,
  selectedTabId: PropTypes.number.isRequired,
}
