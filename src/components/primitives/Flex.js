import PropTypes from 'prop-types'
import system from 'system-components'

export const Flex = system(
  { blacklist: ['spread'] },
  props => ({
    display: 'flex',
    ...(props.spread && { justifyContent: 'space-between' }),
  }),
  'space'
)

Flex.propTypes = {
  spread: PropTypes.bool,
}
