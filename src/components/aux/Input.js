import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ResizableBox } from 'react-resizable'
import { withResizeDetector } from 'react-resize-detector'

import { cursorValue, media } from '~/utils/styling'
import { getReactElementString, getSVGImageURLString } from '~/utils/aux'
import TextareaExpand from '~/assets/svgIllustrations/textarea-expand.svg'
import attachClassName from '~/components/aux/hoc/attachClassName'
import { isTouchDevice } from '~/utils/featureDetects'

const BOTTOM_BORDER_HEIGHT = 2
const EXPAND_IMAGE_SIDE = 10
const TEXTFIELD_MIN_HEIGHT = 200
const TEXTFIELD_DEFAULT_WIDTH = 350

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  font-size: 16px;

  ${media.min.phone`
    font-size: 14px;
  `};

  ${props => css`
    border-radius: ${props.theme.borderRadius};
  `};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    ${props =>
    props.multiline
      ? css`
            clip: rect(
              ${props.height - BOTTOM_BORDER_HEIGHT}px,
              ${props.width}px,
              ${props.height}px,
              0px
            );
            height: 100%;
          `
      : css`
            height: ${BOTTOM_BORDER_HEIGHT}px;
          `};
    ${props => css`
      transition: background-color 200ms;
      border-bottom-left-radius: ${props.theme.borderRadius};
      border-bottom-right-radius: ${props.theme.borderRadius};
    `};
    ${props =>
    props.focused &&
      css`
        background-color: ${props.theme.colors.primary.base};
      `};
    ${props =>
    props.errorMessage &&
      css`
        background-color: ${props.theme.colors.richRed.base};
      `};
  }

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`

const ErrorMessageWrapper = styled.div`
  font-size: 12px;
  margin-top: 5px;
  ${props => css`
    color: ${props.theme.colors.richRed.base};
  `};
`

const EXPAND_IMAGE_SVG_STRING = getReactElementString(TextareaExpand)
const BG_IMG_STRING = getSVGImageURLString(EXPAND_IMAGE_SVG_STRING, {
  dimensions: [EXPAND_IMAGE_SIDE, EXPAND_IMAGE_SIDE],
})

// background-color is handled on the wrapper to avoid styling issues while resizing
const TextAreaWrapper = styled(InputWrapper)`
  overflow: visible;
  .react-resizable {
    position: relative;
    width: 100% !important;
    max-width: 100%;
    ${props => css`
      border-radius: ${props.theme.borderRadius};
    `};
    ${props =>
    props.grey &&
      css`
        background-color: ${props.theme.colors.sensitiveGrey.base};
        textarea {
          background-color: transparent;
        }
      `};
    &-handle {
      position: absolute;
      width: ${EXPAND_IMAGE_SIDE}px;
      height: ${EXPAND_IMAGE_SIDE}px;
      bottom: 5px;
      right: 5px;
      background-image: url("${BG_IMG_STRING}");
      ${props =>
    props.disabled &&
        css`
          pointer-events: none;
        `}
      ${isTouchDevice() &&
        css`
          display: none;
        `}
    }
  }
`

const getTextField = multiline => styled[multiline ? 'textarea' : 'input']`
  background: none;
  padding: 0;
  border: 0;
  font: inherit;
  outline: none;
  max-width: 100%;

  ${props =>
    multiline &&
    css`
      resize: none;
      height: 100%;
      padding-top: 11px;
      ${!props.disabled &&
        css`
          &:hover {
            box-shadow: 1px 1px 1px rgba(27, 27, 27, 0.05);
          }
          &:focus {
            box-shadow: none;
          }
        `};
    `};
  &::-ms-clear {
    display: none;
  }
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'text' })};
    ::placeholder {
      color: ${props.theme.colors.richBlack.lightest};
    }
    transition: ${props.theme.transition};
    &:focus::placeholder {
      opacity: 0;
    }
  `};
  ${props => css([props.styleTemplateString])};
`

const getOnChangeHandler = handler => e => handler(e.target.value)

@withResizeDetector
class Input extends PureComponent {
  state = {
    focused: false,
    height: TEXTFIELD_MIN_HEIGHT,
  }
  getFocusStateHandler = (focused, callback) => () => {
    this.setState({ focused }, () => callback(focused))
  }
  ComponentName = getTextField(this.props.multiline)
  handleResize = (_, { size }) => this.setState({ height: size.height })
  render() {
    const {
      onChange,
      onFocus,
      onBlur,
      styleTemplateString,
      type,
      grey,
      multiline,
      errorMessage,
      width: resizedWidth,
      className,
      isFocused,
      ...props
    } = this.props
    const { height } = this.state
    const focused = isFocused !== null ? isFocused : this.state.focused
    const TextFieldWrapper = multiline ? TextAreaWrapper : InputWrapper

    const width = resizedWidth || TEXTFIELD_DEFAULT_WIDTH

    // just for handling the resizing on multiline
    const AuxWrapper = multiline ? ResizableBox : Fragment
    const auxWrapperProps = multiline
      ? {
        width,
        height: TEXTFIELD_MIN_HEIGHT,
        axis: 'y',
        minConstraints: [width, TEXTFIELD_MIN_HEIGHT],
        onResize: this.handleResize,
      }
      : {}

    const textFieldWrapperProps = {
      grey,
      focused,
      multiline,
      errorMessage,
      disabled: props.disabled,
      height,
      width,
    }

    return (
      <Fragment>
        <TextFieldWrapper {...textFieldWrapperProps} className={className}>
          <AuxWrapper {...auxWrapperProps}>
            <this.ComponentName
              onChange={getOnChangeHandler(onChange)}
              onFocus={this.getFocusStateHandler(true, onFocus)}
              onBlur={this.getFocusStateHandler(false, onBlur)}
              {...!multiline && { type }}
              styleTemplateString={styleTemplateString}
              grey={grey}
              {...props}
            />
          </AuxWrapper>
        </TextFieldWrapper>
        {errorMessage && <ErrorMessageWrapper>{errorMessage}</ErrorMessageWrapper>}
      </Fragment>
    )
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  styleTemplateString: PropTypes.array,
  grey: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  /** from `react-resize-detector` decorator */
  width: PropTypes.number,
  className: PropTypes.string,
  /** force focused state */
  isFocused: PropTypes.bool,
}

Input.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  type: 'text',
  styleTemplateString: null,
  grey: false,
  multiline: false,
  disabled: false,
  errorMessage: null,
  width: null,
  className: null,
  isFocused: null,
}

const { Component, globalClassName } = attachClassName(Input)

export const INPUT_CLASSNAME = globalClassName

export default Component
