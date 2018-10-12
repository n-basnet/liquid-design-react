import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import styled, { css } from 'styled-components'
import cx from 'classnames'

import GenericInput from '~/components/aux/Input'
import { getClassName } from '~/components/aux/hoc/attachClassName'
import { GLOBAL_CSS_PREFIX } from '~/utils/consts'

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

const getBgColor = ({ theme, grey }) => theme.colors[grey ? 'sensitiveGrey' : 'white'].base
const getInputStyle = multiline => css`
  padding: ${multiline ? 11 : 9}px 15px 11px;
  width: 100%;
  ${props => css`
    background-color: ${getBgColor(props)};
    border-radius: ${props.theme.borderRadius};
  `};
`

export default class TextField extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.node,
    required: PropTypes.bool,
    /**
      Takes the value string as input.
      Should return either `true` or a string - in the latter case,
      the field is treated as invalid and string displayed as error message
    */
    validate: PropTypes.func,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    value: undefined,
    label: null,
    required: false,
    validate: () => true,
    style: {},
    disabled: false,
    multiline: false,
    onChange: () => {},
  }
  id = `${GLOBAL_CSS_PREFIX}${uniqid()}`
  getErrorMessage = () => {
    const { validate, value } = this.props
    const validationResult = validate(value)
    const hasErrorMessage = typeof validationResult === 'string'
    return hasErrorMessage ? validationResult : null
  }
  render() {
    const { value, label, required, style, multiline, onChange, ...props } = this.props
    return (
      <InputWrapper
        style={style}
        className={cx(TEXT_FIELD_CLASSNAMES.BASE, {
          [TEXT_FIELD_CLASSNAMES.MULTILINE]: multiline,
          [TEXT_FIELD_CLASSNAMES.SINGLE]: !multiline,
        })}
      >
        {label && (
          <LabelWrapper htmlFor={this.id}>
            {label}
            {required ? '*' : ''}
          </LabelWrapper>
        )}
        <GenericInput
          errorMessage={this.getErrorMessage()}
          styleTemplateString={getInputStyle(multiline)}
          value={value}
          multiline={multiline}
          id={this.id}
          onChange={onChange}
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
}
