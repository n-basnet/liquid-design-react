import React from 'react'
import PropTypes from 'prop-types'

import ButtonWrapper from '~/elements/Button/Wrappers/Button'
import GhostWrapper from '~/elements/Button/Wrappers/Ghost'
import ButtonLabel from '~/elements/Button/Labels/Button'
import GhostLabel from '~/elements/Button/Labels/Ghost'
import { Glyph } from '~/elements/Icon'
import attachClassName from '~/components/aux/hoc/attachClassName'

export const Button = ({
  active,
  appearance,
  disabled,
  icon,
  isIconOnRight,
  label,
  size,
  onClick,
  ...props
}) => {
  const wrapperProps = {
    active,
    appearance,
    disabled,
    isIconOnRight,
    label,
    size,
    onClick,
    ...props,
  }

  const isGhost = appearance === 'ghost'
  const LabelComponent = isGhost ? GhostLabel : ButtonLabel
  const WrapperComponent = isGhost ? GhostWrapper : ButtonWrapper

  return (
    <WrapperComponent {...wrapperProps}>
      {icon && (
        <Glyph
          name={icon}
          size={isGhost ? (size === 'big' ? 18 : 16) : 24}
          style={!isGhost && label ? { marginLeft: '28px' } : {}}
        />
      )}
      {label && (
        <LabelComponent appearance={appearance} disabled={disabled} icon={icon} size={size}>
          {label}
        </LabelComponent>
      )}
    </WrapperComponent>
  )
}

Button.defaultProps = {
  active: false,
  appearance: 'primary',
  disabled: false,
  icon: null,
  isIconOnRight: false,
  label: null,
  size: 'small',
  onClick: null,
}

Button.propTypes = {
  active: PropTypes.bool,
  appearance: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  isIconOnRight: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

const { Component } = attachClassName(Button)

export default Component
