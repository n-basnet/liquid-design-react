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
  children,
  size,
  onClick,
  ...props
}) => {
  const wrapperProps = {
    active,
    appearance,
    disabled,
    isIconOnRight,
    children,
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
          style={!isGhost && children ? { marginLeft: '28px' } : {}}
        />
      )}
      {children && (
        <LabelComponent appearance={appearance} disabled={disabled} icon={icon} size={size}>
          {children}
        </LabelComponent>
      )}
    </WrapperComponent>
  )
}

const APPEARANCE_VALUES = ['primary', 'secondary', 'highlight', 'ghost']

Button.defaultProps = {
  active: false,
  appearance: 'primary',
  disabled: false,
  /** icon name to be displayed along Button content */
  icon: null,
  isIconOnRight: false,
  children: null,
  size: 'small',
  onClick: null,
}

Button.propTypes = {
  active: PropTypes.bool,
  appearance: PropTypes.oneOf(APPEARANCE_VALUES),
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  isIconOnRight: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

const { Component, globalClassName } = attachClassName(Button)

export const BUTTON_CLASSNAME = globalClassName

export default Component
