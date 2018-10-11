import PropTypes from 'prop-types'

export const tabsPropTypes = {
  appearance: PropTypes.string,
  children: PropTypes.node.isRequired,
  id: PropTypes.number.isRequired,
  selectedTabId: PropTypes.number.isRequired,
}

export const tabsDefaultProps = {
  appearance: 'sticky',
}
