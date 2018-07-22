import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import empty from '~/graphics/checkbox/empty.svg'
import filled from '~/graphics/checkbox/filled.svg'
import hover from '~/graphics/checkbox/hover.svg'

const CheckboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  padding-left: 32px;
  ${props => css`
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
  `};
  & svg {
    left: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
    position: absolute;
  }
  &:hover {
    & svg {
      ${props => css`
        border-radius: ${!props.disabled && '7px'};
        box-shadow: ${!props.disabled && props.theme.smallBoxShadow};
      `};
    }
  }
`

const Input = styled.input`
  display: none;
`

export const Label = styled.label`
  position: relative;
  font-size: 14px;
  line-height: 1.75;
  ${props => css`
    color: ${props.theme.colors.richBlack};
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    ${props.disabled &&
      css`
        opacity: 0.3;
      `};
  `};
`

class Checkbox extends Component {
  state = {
    filled: false,
    hover: null,
  }

  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  }

  toggleCheckbox = () =>
    !this.props.disabled && this.setState({ filled: !this.state.filled })

  render() {
    const { disabled, id, name, label, value } = this.props
    const CustomInput = this.state.filled
      ? filled
      : this.state.hover ? hover : empty

    return (
      <CheckboxWrapper
        disabled={disabled}
        onClick={this.toggleCheckbox}
        onMouseEnter={() =>
          !this.props.disabled && this.setState({ hover: true })
        }
        onMouseLeave={() =>
          !this.props.disabled && this.setState({ hover: false })
        }
      >
        <Input id={id} name={name} type='checkbox' value={value} />
        <CustomInput />
        <Label disabled={disabled} htmlFor={id}>
          {label}
        </Label>
      </CheckboxWrapper>
    )
  }
}

export default Checkbox
