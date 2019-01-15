import PropTypes from 'prop-types'

export const optionPropType = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
