import PropTypes from 'prop-types'

// copied in components/FlyOut/index to be displayed in prop table

export const flyOutPropTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    }),
  ),
}

export const flyOutDefaultProps = {
  name: null,
  options: [],
}
