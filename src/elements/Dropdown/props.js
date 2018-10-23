import PropTypes from 'prop-types'

export const optionPropType = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export const optionDefaultProps = PropTypes.shape({
  onClick: () => {},
})

export const dropdownPropTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.shape(optionPropType),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  multiselect: PropTypes.bool,
  selectedOptionsIds: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.shape(optionPropType)),
  onOptionDeselect: PropTypes.func,
  onSubmit: PropTypes.func,
  /** Id of selected option - for controlling the state externally. */
  value: PropTypes.string,
}

export const dropdownDefaultProps = {
  label: null,
  defaultValue: null,
  disabled: false,
  inline: false,
  multiselect: false,
  selectedOptionsIds: [],
  options: [],
  onOptionDeselect: () => {},
  onSubmit: () => {},
  value: null,
}

export const SHARED_PROPS = ['options', 'inline', 'multiselect', 'selectedOptionsIds']
