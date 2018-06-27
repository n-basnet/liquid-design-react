import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import system from 'system-components'
import { darken } from 'polished'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { borderRadius, fontFamily, transition } from '~/utils/consts/rules'
import Icon from '~/components/Icon'

const BadgeWrapper = system(
  props => ({
    backgroundColor: props.theme.colors.secondary,
    '&:hover': !props.disabled && {
      backgroundColor: darken(0.2, props.theme.colors.secondary),
    },
    opacity: props.disabled ? 0.5 : 1,
    cursor: 'default',
  }),
  {
    display: 'inline-block',
    borderRadius,
    fontFamily,
    transition,
    fontSize: '12px',
    padding: '5px 10px',
  },
)

BadgeWrapper.defaultProps = {
  theme: DEFAULT_THEME,
}

const BadgeTextWrapper = system(
  {is: 'span'},
  'space',
).extend`
  display: inline-block;
  vertical-align: middle;
  padding-top: 2px;
`

export const Badge = ({
  text,
  icon,
  disabled,
}) =>
  <BadgeWrapper disabled={disabled}>
    <Fragment>
      {icon && <Icon name={icon} style={{verticalAlign: 'middle'}} />}
      <BadgeTextWrapper pl={icon && 2}>{text}</BadgeTextWrapper>
    </Fragment>
  </BadgeWrapper>

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
}
