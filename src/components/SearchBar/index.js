import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { isEmpty } from 'ramda'
import enhanceWithClickOutside from 'react-click-outside'
import cx from 'classnames'

import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import Input, { INPUT_CLASSNAME } from '~/components/aux/Input'
import Ellipsis from '~/components/aux/Ellipsis'
import { media } from '~/utils/styling'
import { getClassName } from '~/components/aux/hoc/attachClassName'

const getIconColorStyles = props => css`
  .${ICON_CLASSNAME} svg {
    fill: ${props.theme.colors.primary.base};
  }
`

const getBackgroundColor = (ghost, color) =>
  !ghost &&
  css`
    background-color: ${color};
  `

export const PLACEHOLDER_TEXT = 'Search…'

const SearchBarWrapper = styled.form`
  position: relative;
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  ${media.max.phone`
    font-size: 16px;
  `};
  .${ICON_CLASSNAME} {
    position: absolute;
    left: 12px;
    top: 9px;
    ${media.max.phone`
      top: 14px;
    `};
  }
  .${INPUT_CLASSNAME} {
    ${props =>
    props.disabled &&
      css`
        opacity: 1;
      `};
    input {
      min-width: 250px;
      padding: 12px 9px 9px 44px;
      transform: translateY(-2px);
      ${media.max.phone`
        padding: 16px 9px 12px 44px;
      `};
      ${props =>
    !props.disabled &&
        css`
          &:hover::placeholder {
            color: ${props.theme.colors.primary.base};
          }
        `};
    }
  }
  ${props => css`
    ${getBackgroundColor(props.ghost, props.theme.colors.sensitiveGrey.base)};
    transition: ${props.theme.transition};
    .${ICON_CLASSNAME} svg {
      transition: ${props.theme.transition};
      fill: ${props.theme.colors.sensitiveGrey.darker};
    };
    ${
  props.hasResults || props.ghost
    ? css`
            border-top-left-radius: ${props.theme.borderRadius};
            border-top-right-radius: ${props.theme.borderRadius};
          `
    : css`
            overflow: hidden;
            border-radius: ${props.theme.borderRadius};
          `
};
    ${
  props.disabled
    ? css`
            opacity: 0.5;
          `
    : props.focused
      ? css`
              ${!props.ghost &&
                css`
                  box-shadow: ${props.theme.boxShadow};
                `};
              ${getIconColorStyles};
            `
      : css`
              &:hover {
                ${getBackgroundColor(props.ghost, props.theme.colors.sensitiveGrey.dark)};
                ${getIconColorStyles};
              }
            `
};
        };
  `};
`

const ResultsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  overflow: hidden;
  ${props => css`
    box-shadow: ${props.theme.boxShadow};
    border-bottom-left-radius: ${props.theme.borderRadius};
    border-bottom-right-radius: ${props.theme.borderRadius};
  `};
`

export const ResultWrapper = styled.div`
  padding: 9px 15px 12px;
  ${media.max.phone`
    padding: 13px 15px 15px;
  `};
  ${props => css`
    background-color: ${props.theme.colors.sensitiveGrey.base};
    border-bottom: 1px solid ${props.theme.colors.sensitiveGrey.dark};
    transition: ${props.theme.transition};
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    &:hover,
    &:focus {
      color: ${props.theme.colors.primary.base};
      font-weight: ${props.theme.fontWeight.black};
      outline: none;
    }
    &:hover {
      background-color: ${props.theme.colors.sensitiveGrey.dark};
    }
    &:focus {
      background-color: ${props.theme.colors.sensitiveGrey.darker};
    }
  `};
`

const DEFAULT_RESULTS = []

export class SearchBar extends PureComponent {
  static propTypes = {
    /** handler for submitting the form with Return key */
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    /** ghost styling */
    ghost: PropTypes.bool,
    /** options for search results */
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      })
    ),
    className: PropTypes.string,
  }
  static defaultProps = {
    /** handler for submitting a query */
    handleSubmit: () => {},
    disabled: false,
    ghost: false,
    options: [],
    className: null,
  }
  state = {
    value: '',
    focused: false,
    results: DEFAULT_RESULTS,
  }
  getSubmitHandler = handler => e => {
    e.preventDefault()
    if (!this.props.disabled) {
      handler(this.state.value)
      this.setInputValue(this.state.value, DEFAULT_RESULTS)
    }
  }
  setInputValue = (value, resultsOverride) => {
    if (!this.props.disabled) {
      const regexp = value && new RegExp(value, 'i')
      const updatedResults = value
        ? this.props.options.filter(v => regexp.test(v.text))
        : DEFAULT_RESULTS
      this.setState({
        value,
        results: resultsOverride || updatedResults,
      })
    }
  }
  getInputFocusHandler = focused => () => this.setState({ focused })
  triggerResultHandler = (handler, value) => {
    handler && handler()
    this.setInputValue(value, DEFAULT_RESULTS)
  }
  getResultKeyDownHandler = (handler, value) => e =>
    e.key === 'Enter' && this.triggerResultHandler(handler, value)
  getResultOnClickHandler = (handler, value) => () => this.triggerResultHandler(handler, value)
  handleClickOutside = () => this.setInputValue(this.state.value, DEFAULT_RESULTS)
  render() {
    const { handleSubmit, disabled, ghost, className, ...props } = this.props
    const { focused, value, results } = this.state
    const hasResults = !isEmpty(this.state.results)
    return (
      <SearchBarWrapper
        onSubmit={this.getSubmitHandler(handleSubmit)}
        focused={hasResults || focused}
        hasResults={hasResults}
        disabled={disabled}
        ghost={ghost}
        className={cx(getClassName(SearchBar), className)}
        {...props}
      >
        <Glyph name='search' size={24} />
        <Input
          type='text'
          placeholder={PLACEHOLDER_TEXT}
          value={value}
          disabled={disabled}
          onChange={this.setInputValue}
          onFocus={this.getInputFocusHandler(true)}
          onBlur={this.getInputFocusHandler(false)}
        />
        <ResultsWrapper>
          {results.map((v, i) => (
            <ResultWrapper
              tabIndex='0'
              role='button'
              key={i}
              onClick={this.getResultOnClickHandler(v.onClick, v.text)}
              onKeyDown={this.getResultKeyDownHandler(v.onClick, v.text)}
            >
              <Ellipsis>{v.text}</Ellipsis>
            </ResultWrapper>
          ))}
        </ResultsWrapper>
      </SearchBarWrapper>
    )
  }
}

export default enhanceWithClickOutside(SearchBar)
