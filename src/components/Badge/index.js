import React from 'react'
import PropTypes from 'prop-types'
import system from 'system-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { borderRadius, fontFamily } from '~/utils/consts/rules'

const BadgeWrapper = system(
  props => ({
    backgroundColor: props.theme.colors.secondary,
  }),
  {
    display: 'inline-block',
    borderRadius,
    fontFamily,
    fontSize: '12px',
  },
  'space'
)

BadgeWrapper.defaultProps = {
  theme: DEFAULT_THEME,
}

export const Badge = ({
  text,
}) =>
  <BadgeWrapper px={2} py={1}>
    {text}
  </BadgeWrapper>

Badge.propTypes = {
  text: PropTypes.string.isRequired,
}
