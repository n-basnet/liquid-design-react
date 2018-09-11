import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import InputWrapper from '~/elements/RadioButton/InputWrapper'
import RadioButtonWrapper from '~/elements/RadioButton/RadioButtonWrapper'
import LabelWrapper from '~/elements/RadioButton/LabelWrapper'

class RadioButton extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    selected: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    disabled: false,
    name: 'radioButton',
  }

  render() {
    const { disabled, name, selected, label, value, onClick } = this.props
    const id = `${name}-${value}`

    /* additional props in RadioButtonWrapper are required for the Firefox and Edge, which do not currently support :before for input fields */

    return (
      <RadioButtonWrapper
        disabled={disabled}
        isChecked={selected === value}
        value={value}
      >
        <InputWrapper
          disabled={disabled}
          id={id}
          isChecked={selected === value}
          name={name}
          type='radio'
          value={value}
          onClick={onClick}
        />
        <LabelWrapper disabled={disabled} htmlFor={id}>
          {label}
        </LabelWrapper>
      </RadioButtonWrapper>
    )
  }
}

export default RadioButton
