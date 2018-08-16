import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'
import { default as Icon, ICON_CLASSNAME } from '~/elements/Icon'

const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  ${props => css`
    ${cursorValue({ ...props, pointer: true })};
  `};
  ${props =>
    props.disabled &&
    css`
      opacity: 0.3;
    `};
  .${ICON_CLASSNAME} svg {
    transition: fill 200ms;
    border-radius: 8px;
    &:hover {
      ${props =>
    !props.disabled &&
        props.checked &&
        css`
          fill: ${props.theme.colors.primary.dark};
        `};
    }
  }
`

const Input = styled.input`
  display: none;
`

export const Label = styled.label`
  padding-left: 8px;
  font-size: 14px;
  line-height: 1.75;
  ${props => css`
    ${cursorValue({ ...props, pointer: true })};
    color: ${props.theme.colors.richBlack};
  `};
`

class Checkbox extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    /** for controlling the checkbox externally */
    isChecked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    isChecked: false,
    label: null,
    onChange: null,
  }

  state = {
    checked: false,
    hover: null,
  }

  toggleCheckbox = () => {
    if (!this.props.disabled) {
      const checked = !this.state.checked
      this.setState({ checked })
      this.props.onChange && this.props.onChange(checked)
    }
  }

  isChecked = () =>
    this.props.isChecked !== undefined
      ? this.props.isChecked
      : this.state.checked

  render() {
    const { disabled, label, isChecked } = this.props
    const { hover } = this.state
    const iconVersion = this.isChecked() ? 'Filled' : 'Empty'

    return (
      <CheckboxWrapper
        disabled={disabled}
        checked={isChecked || this.isChecked()}
        onClick={this.toggleCheckbox}
        onMouseEnter={() =>
          !this.props.disabled && this.setState({ hover: true })
        }
        onMouseLeave={() =>
          !this.props.disabled && this.setState({ hover: false })
        }
      >
        <Input type='checkbox' />
        <Icon
          name={`checkbox${iconVersion}`}
          color={!hover && !this.isChecked() ? 'sensitiveGrey.base' : undefined}
        />
        <Label disabled={disabled}>{label}</Label>
      </CheckboxWrapper>
    )
  }
}

export default Checkbox
