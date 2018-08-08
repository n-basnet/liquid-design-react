import React from 'react'
import PropTypes from 'prop-types'

import { ButtonWrapper } from '~/elements/Button/ButtonWrapper'
import { GhostButtonWrapper } from '~/elements/Button/GhostButtonWrapper'
import { Label, GhostLabel } from '~/elements/Button/Labels'
import Icon from '~/elements/Icon'

const Button = ({
  active,
  appearance,
  disabled,
  icon,
  iconRight,
  label,
  size,
  onClick,
}) => {
  const wrapperProps = {
    active,
    appearance,
    disabled,
    iconRight,
    label,
    size,
    onClick,
  }

  return appearance === 'ghost' ? (
    <GhostButtonWrapper {...wrapperProps}>
      {icon && <Icon name={icon} size={size === 'large' ? 18 : 16} />}
      {label && (
        <GhostLabel
          appearance={appearance}
          disabled={disabled}
          icon={icon}
          size={size}
        >
          {label}
        </GhostLabel>
      )}
    </GhostButtonWrapper>
  ) : (
    <ButtonWrapper {...wrapperProps}>
      {icon && (
        <Icon name={icon} style={label && { marginLeft: '28px' }} size={24} />
      )}
      {label && (
        <Label appearance={appearance} disabled={disabled} icon={icon}>
          {label}
        </Label>
      )}
    </ButtonWrapper>
  )
}

Button.defaultProps = {
  active: false,
  appearance: 'primary',
  disabled: false,
  icon: null,
  iconRight: false,
  label: null,
  size: 'small',
  onClick: 'null',
}

Button.propTypes = {
  active: PropTypes.bool,
  appearance: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconRight: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  appearance: 'primary',
  size: 'small',
}

Button.displayName = 'Button'

export default Button
