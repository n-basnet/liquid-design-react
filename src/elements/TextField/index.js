import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import styled, { css } from 'styled-components'
import cx from 'classnames'

import GenericInput from '../../components/misc/Input'
import { getClassName } from '../../components/misc/hoc/attachClassName'
import { GLOBAL_CSS_PREFIX } from '../../utils/consts'

const InputWrapper = styled.div`
  display: inline-block;
  margin-bottom: 21px;
`

export const LabelWrapper = styled.label`
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  ${props => css`
    color: ${props.theme.colors.richBlack.lightest};
  `};
`

const getBgColor = ({ theme, grey }) =>
  theme.colors[grey ? 'sensitiveGrey' : 'white'].base
const getInputStyle = multiline => css`
  padding: ${multiline ? 11 : 9}px 15px 11px;
  width: 100%;
  ${props => css`
    background-color: ${getBgColor(props)};
    border-radius: ${props.theme.borderRadius};
  `};
`

const DEFAULT_VALUE = undefined

export default class TextField extends React.Component {
  static propTypes = {
    /** If not provided, the underlying `input` will be an uncontrolled one. */
    value: PropTypes.string,
    /** Label to display above the text field. */
    label: PropTypes.node,
    /**
      A function that takes the value string as input.
      Should return either `true` or a react node - in the latter case,
      the field is treated as invalid and returned node displayed as error message.
    */
    validate: PropTypes.func,
    /**
      For more complicated use cases, i.e. when using a forms library such as `redux-form`,
      it may be more useful to just set the error message explicitly.
    */
    error: PropTypes.node,
    /** A multiline TextField will render a resizeable `textarea` HTML element. */
    multiline: PropTypes.bool,
    /** Change handler. Will receive the input string as argument. */
    onChange: PropTypes.func,
    /** custom className for input or textarea itself */
    inputClassName: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.object,
  }

  static defaultProps = {
    value: DEFAULT_VALUE,
    label: null,
    validate: () => true,
    error: null,
    multiline: false,
    onChange: () => {},
    inputClassName: null,
    disabled: false,
    style: {},
  }

  id = `${GLOBAL_CSS_PREFIX}${uniqid()}`
  getErrorMessage = () => {
    const { validate, value } = this.props
    const validationResult = validate(value === DEFAULT_VALUE ? '' : value)
    const hasErrorMessage = validationResult !== true
    return hasErrorMessage ? validationResult : null
  }

  render() {
    const {
      value,
      label,
      style,
      multiline,
      onChange,
      inputClassName,
      error,
      ...props
    } = this.props
    return (
      <InputWrapper
        style={style}
        className={cx(TEXT_FIELD_CLASSNAMES.BASE, {
          [TEXT_FIELD_CLASSNAMES.MULTILINE]: multiline,
          [TEXT_FIELD_CLASSNAMES.SINGLE]: !multiline,
        })}
      >
        {label && (
          <LabelWrapper
            htmlFor={this.id}
            className={TEXT_FIELD_CLASSNAMES.LABEL}
          >
            {label}
          </LabelWrapper>
        )}
        <GenericInput
          errorMessage={error || this.getErrorMessage()}
          styleTemplateString={getInputStyle(multiline)}
          value={value}
          multiline={multiline}
          id={this.id}
          onChange={onChange}
          inputClassName={inputClassName}
          {...props}
        />
      </InputWrapper>
    )
  }
}

const TEXT_FIELD_CLASSNAME_BASE = getClassName(TextField)
export const TEXT_FIELD_CLASSNAMES = {
  BASE: TEXT_FIELD_CLASSNAME_BASE,
  SINGLE: `${TEXT_FIELD_CLASSNAME_BASE}--single`,
  MULTILINE: `${TEXT_FIELD_CLASSNAME_BASE}--multiline`,
  LABEL: `${TEXT_FIELD_CLASSNAME_BASE}__label`,
}
