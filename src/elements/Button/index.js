import React from 'react'
import PropTypes from 'prop-types'

import ButtonWrapper from '../../elements/Button/Wrappers/Button'
import GhostWrapper from '../../elements/Button/Wrappers/Ghost'
import ButtonLabel from '../../elements/Button/Labels/Button'
import GhostLabel from '../../elements/Button/Labels/Ghost'
import { Glyph } from '../../elements/Icon'
import attachClassName from '../../components/misc/hoc/attachClassName'

export const Button = ({
  appearance,
  disabled,
  icon,
  isIconOnRight,
  isIconFilled,
  children,
  size,
  onClick,
  ...props
}) => {
  const wrapperProps = {
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
          isFilled={isIconFilled}
        />
      )}
      {children && (
        <LabelComponent
          appearance={appearance}
          disabled={disabled}
          hasIcon={!!icon}
          size={size}
        >
          {children}
        </LabelComponent>
      )}
    </WrapperComponent>
  )
}

const APPEARANCE_VALUES = ['primary', 'secondary', 'highlight', 'ghost']
const SIZE_VALUES = ['small', 'big']

Button.propTypes = {
  appearance: PropTypes.oneOf(APPEARANCE_VALUES),
  disabled: PropTypes.bool,
  /** icon name to be displayed along Button content */
  icon: PropTypes.string,
  /** Important! isIconOnRight prop with ghost button type only */
  isIconOnRight: PropTypes.bool,
  isIconFilled: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.oneOf(SIZE_VALUES),
  onClick: PropTypes.func,
}

Button.defaultProps = {
  appearance: 'primary',
  disabled: false,
  icon: null,
  isIconOnRight: false,
  isIconFilled: false,
  children: null,
  size: 'small',
  onClick: null,
}

const { Component, globalClassName } = attachClassName(Button)

export const BUTTON_CLASSNAME = globalClassName

export default Component
