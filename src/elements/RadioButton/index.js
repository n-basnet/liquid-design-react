import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'

import InputWrapper from '../../elements/RadioButton/InputWrapper'
import RadioButtonWrapper from '../../elements/RadioButton/RadioButtonWrapper'
import LabelWrapper from '../../elements/RadioButton/LabelWrapper'
import attachClassName, {
  getClassName,
} from '../../components/misc/hoc/attachClassName'

export class RadioButton extends PureComponent {
  static propTypes = {
    label: PropTypes.node.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    isSelected: false,
    disabled: false,
    onClick: () => {},
  }

  id = getClassName({ name: uniqid() })

  render() {
    const { disabled, isSelected, label, onClick, ...props } = this.props

    // additional props in RadioButtonWrapper are required for the Firefox and Edge, which do not currently support :before for input fields

    return (
      <RadioButtonWrapper
        disabled={disabled}
        isSelected={isSelected}
        {...props}
      >
        <InputWrapper
          type="radio"
          id={this.id}
          isSelected={isSelected}
          onClick={onClick}
          disabled={disabled}
        />
        <LabelWrapper disabled={disabled} htmlFor={this.id}>
          {label}
        </LabelWrapper>
      </RadioButtonWrapper>
    )
  }
}

const { Component } = attachClassName(RadioButton)

export default Component
