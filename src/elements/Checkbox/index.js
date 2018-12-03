import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import cx from 'classnames'

import { cursorValue, nonTouchDevicesHoverStyles } from '~/utils/styling'
import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import attachClassName, { getClassName } from '~/components/aux/hoc/attachClassName'

const getFill = ({ theme, checked }) => {
  const { colors } = theme
  return checked ? colors.primary.base : colors.sensitiveGrey.darker
}

export const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  outline: none;
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
  `};
  ${props =>
    props.disabled &&
    css`
      opacity: 0.3;
    `};
  .${ICON_CLASSNAME} svg {
    transition: fill 200ms;
    fill: ${getFill};
  }
  ${props =>
    !props.disabled &&
    css`
      ${nonTouchDevicesHoverStyles(`
        .${ICON_CLASSNAME} svg {
          fill: ${props.theme.colors.primary.base};
        }
      `)}
      }
  `}
`

export const Input = styled.input`
  display: none;
`

export const Label = styled.label`
  padding-left: 8px;
  font-size: 14px;
  line-height: 1.75;
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
  `};
`

export class Checkbox extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    /** for controlling the checkbox externally - if undefined, the checkbox will use internal state */
    isChecked: PropTypes.bool,
    label: PropTypes.node,
    onChange: PropTypes.func,
    iconSize: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    isChecked: undefined,
    label: null,
    onChange: null,
    iconSize: 24,
    className: null,
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
  handleMouseEnter = () => !this.props.disabled && this.setState({ hover: true })
  handleMouseLeave = () => !this.props.disabled && this.setState({ hover: false })

  isChecked = () => (this.props.isChecked !== undefined ? this.props.isChecked : this.state.checked)

  handleKeyDown = e => {
    if (!this.props.disabled && e.key === ' ') {
      e.preventDefault()
      this.toggleCheckbox()
    }
  }

  render() {
    const { disabled, label, className, iconSize, ...props } = this.props
    const { hover } = this.state
    const iconVersion = this.isChecked() ? 'Filled' : 'Empty'

    return (
      <CheckboxWrapper
        className={cx(className, {
          [CHECKBOX_CLASSNAMES.UNCHECKED]: !this.isChecked(),
          [CHECKBOX_CLASSNAMES.CHECKED]: this.isChecked(),
          [CHECKBOX_CLASSNAMES.HOVER]: hover,
        })}
        disabled={disabled}
        checked={this.isChecked()}
        onClick={this.toggleCheckbox}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onKeyDown={this.handleKeyDown}
        tabIndex='0'
        {...props}
      >
        <Input type='checkbox' checked={this.isChecked()} readOnly />
        <Glyph name={`checkbox${iconVersion}`} noFill size={iconSize} />
        {label && <Label disabled={disabled}>{label}</Label>}
      </CheckboxWrapper>
    )
  }
}

const CHECKBOX_CLASSNAME_BASE = getClassName(Checkbox)
export const CHECKBOX_CLASSNAMES = {
  BASE: CHECKBOX_CLASSNAME_BASE,
  UNCHECKED: `${CHECKBOX_CLASSNAME_BASE}--unchecked`,
  CHECKED: `${CHECKBOX_CLASSNAME_BASE}--checked`,
  HOVER: `${CHECKBOX_CLASSNAME_BASE}--hover`,
}

const { Component, globalClassName } = attachClassName(Checkbox)

export const CHECKBOX_CLASSNAME = globalClassName

export default Component
