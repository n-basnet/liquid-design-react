import PropTypes from 'prop-types'
import system from 'system-components'

export const Flex = system(
  { blacklist: ['spread', 'centerY'] },
  props => ({
    display: 'flex',
    ...(props.spread && { justifyContent: 'space-between' }),
    ...(props.centerY && { alignItems: 'center' }),
  }),
  'space'
)

Flex.propTypes = {
  spread: PropTypes.bool,
  centerY: PropTypes.bool,
}
