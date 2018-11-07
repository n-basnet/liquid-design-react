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

export const DEFAULT_PLACEHOLDER_TEXT = 'Search…'

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
    ${props =>
    props.hasResults &&
      css`
        overflow: visible;
        &:after {
          border-radius: 0;
        }
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
    z-index: ${props.theme.zIndex.searchbarResults};
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

export const RESULT_WRAPPER_CLASSNAME = getClassName(ResultWrapper)

const EMPTY_RESULTS = []

export class SearchBar extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    /** ghost styling */
    ghost: PropTypes.bool,
    /** options for search results */
    options: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    className: PropTypes.string,
  }
  static defaultProps = {
    onSubmit: () => {},
    disabled: false,
    ghost: false,
    options: [],
    placeholder: DEFAULT_PLACEHOLDER_TEXT,
    className: null,
  }
  state = {
    value: '',
    focused: false,
    results: EMPTY_RESULTS,
  }
  handleSubmit = (e, value = this.state.value) => {
    e && e.preventDefault()
    if (!this.props.disabled) {
      this.props.onSubmit(value)
      this.setInputValue(value)
      this.hideResults()
    }
  }
  setInputValue = value => {
    const regexp = new RegExp(value, 'i')
    const results =
      value.length > 0 ? this.props.options.filter(v => regexp.test(v)) : EMPTY_RESULTS
    this.setState({
      value,
      results,
    })
  }
  hideResults = () => this.setState({ results: EMPTY_RESULTS })
  getInputFocusHandler = focused => () => this.setState({ focused })
  getResultOnClickHandler = value => () => this.handleSubmit(null, value)
  getResultKeyDownHandler = value => e => e.key === 'Enter' && this.handleSubmit(null, value)
  handleClickOutside = this.hideResults
  render() {
    const { onSubmit, disabled, placeholder, ghost, className, ...props } = this.props
    const { focused, value, results } = this.state
    const hasResults = !isEmpty(this.state.results)
    return (
      <SearchBarWrapper
        onSubmit={this.handleSubmit}
        focused={hasResults || focused}
        hasResults={hasResults}
        disabled={disabled}
        ghost={ghost}
        className={cx(getClassName(SearchBar), className)}
        {...props}
      >
        <Glyph name='search' size={24} />
        <Input
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          isFocused={hasResults || null}
          onChange={this.setInputValue}
          onFocus={this.getInputFocusHandler(true)}
          onBlur={this.getInputFocusHandler(false)}
        />
        <ResultsWrapper className={RESULT_WRAPPER_CLASSNAME}>
          {results.map((resultText, i) => (
            <ResultWrapper
              tabIndex='0'
              role='button'
              key={i}
              onClick={this.getResultOnClickHandler(resultText)}
              onKeyDown={this.getResultKeyDownHandler(resultText)}
            >
              <Ellipsis>{resultText}</Ellipsis>
            </ResultWrapper>
          ))}
        </ResultsWrapper>
      </SearchBarWrapper>
    )
  }
}

export default enhanceWithClickOutside(SearchBar)
