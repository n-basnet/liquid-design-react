import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { pick, isEmpty } from 'ramda'
import enhanceWithClickOutside from 'react-click-outside'

import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import OptionsGroup, { OPTIONS_GROUP_CLASSNAME } from '~/elements/Dropdown/OptionsGroup'
import Ellipsis from '~/components/aux/Ellipsis'
import { cursorValue, media } from '~/utils/styling'
import { dropdownPropTypes, dropdownDefaultProps, SHARED_PROPS } from '~/elements/Dropdown/props'
import SelectedOptionsLabel from '~/elements/Dropdown/SelectedOptionsLabel'
import attachClassName from '~/components/aux/hoc/attachClassName'

const ICON_MOBILE_SCALE = 1.27

const ARROW_ICON_CLASSNAME = `${ICON_CLASSNAME}Arrow`

const getInnerWrapperStyle = props => {
  const boxShadow = props.theme[props.isExpanded ? 'doubleBoxShadow' : 'boxShadow']
  const backgroundColor = rgba(props.theme.colors.white.base, props.disabled ? 0.5 : 1)
  return css`
    min-width: 250px;
    background-color: ${backgroundColor};
    ${!props.disabled &&
      css`
        &:hover {
          box-shadow: ${boxShadow};
        }
      `};
    ${props.isExpanded &&
      css`
        box-shadow: ${props.theme.doubleBoxShadow};
      `};
  `
}

const getActiveState = props => css`
  color: ${props.theme.colors.primary.base};
  font-weight: ${props.theme.fontWeight.black};
`

const getTransformValue = ({ isExpanded }, isMobile) => css`
  transform: rotate(${isExpanded ? 0 : 180}deg) translateY(${isExpanded ? -2 : 2}px);
  ${media.max.phone`
      transform: scale(${ICON_MOBILE_SCALE}) rotate(${isExpanded ? 0 : 180}deg) translateY(${
  isExpanded ? -1 : 1
}px);
    `};
`

const DropdownWrapper = styled.div`
  position: relative;
  min-width: 160px;
  max-width: 500px;
  display: inline-block;
  font-size: 14px;
  line-height: 1.7;
  ${props =>
    props.inline &&
    media.max.phone`
    min-width: 190px;
  `};

  ${props => css`
    color: ${rgba(props.theme.colors.richBlack.base, props.disabled ? 0.15 : 1)};
    transition: ${props.theme.transition};
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
    ${media.max.phone`
      font-size: 16px;
    `};
    ${
  props.isExpanded
    ? css`
            border-top-left-radius: ${props.theme.borderRadius};
            border-top-right-radius: ${props.theme.borderRadius};
          `
    : css`
            border-radius: ${props.theme.borderRadius};
          `
}

    .${ARROW_ICON_CLASSNAME} {
      margin-top: ${props.inline ? 2 : 3}px;
      margin-left: 3px;
      margin-right: 2px;
      transition: ${props.theme.transition};
      ${getTransformValue(props)};
      ${media.max.phone`
        margin-left: 10px;
      `};
    }

    ${
  props.inline
    ? css`
            .${OPTIONS_GROUP_CLASSNAME} {
              transform: translate(-7px, -3px);
              ${media.max.phone`
            transform: translate(-12px, 0px);
          `};
            }
          `
    : getInnerWrapperStyle
};
  `};
`

export const DropdownTriggerWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  line-height: 26px;
  border-bottom: 1px solid transparent;
  ${props => css`
    justify-content: ${props.inline ? 'flex-end' : 'space-between'};
    align-items: center;
    padding: ${props.inline ? '8px 15px 7px 15px' : '6px 11px 5px 15px'};
    ${media.max.phone`
      padding: ${props.inline ? '11px 20px 10px 15px' : '11px 12px 10px 15px'};
    `};
    ${props.hasValue && getActiveState};
    &:focus {
      outline: none;
    }
  `};
  ${props =>
    props.isExpanded &&
    css`
      border-bottom-color: ${props.theme.colors.sensitiveGrey.base};
    `};
`

const getSelectedOptionsItems = (options, selectedOptionsIdsIds) =>
  options.filter(({ id }) => selectedOptionsIdsIds.indexOf(id) >= 0)

export class Dropdown extends PureComponent {
  static propTypes = dropdownPropTypes
  static defaultProps = dropdownDefaultProps
  state = {
    isExpanded: false,
    submittedOption: null,
    wasSubmitted: false,
  }
  toggle = () => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))
  getKeyDownHandler = handler => e => e.key === 'Enter' && handler()
  handleClickOutside = () => this.setState({ isExpanded: false })
  handleSubmit = option => {
    if (this.props.multiselect) {
      return
    }
    this.setState({
      submittedOption: option,
      isExpanded: false,
      wasSubmitted: true,
    })
    this.props.onSubmit && this.props.onSubmit(option)
  }
  getActiveOption = () => {
    const { submittedOption, wasSubmitted } = this.state
    const { defaultValue } = this.props
    return submittedOption || (!wasSubmitted && defaultValue) || null
  }
  render() {
    const {
      label,
      disabled,
      inline,
      options,
      multiselect,
      selectedOptionsIds,
      onOptionDeselect,
      ...props
    } = this.props
    const { isExpanded } = this.state
    const triggerToggle = disabled ? undefined : this.toggle
    const hasSelectedOptions = multiselect && !isEmpty(selectedOptionsIds)
    const activeOption = this.getActiveOption()
    return (
      <DropdownWrapper isExpanded={isExpanded} disabled={disabled} inline={inline} {...props}>
        <DropdownTriggerWrapper
          hasValue={activeOption}
          inline={inline}
          onClick={triggerToggle}
          onKeyDown={this.getKeyDownHandler(triggerToggle)}
          isExpanded={isExpanded}
          multiselect={multiselect}
          tabIndex='0'
          role='button'
        >
          {hasSelectedOptions ? (
            <SelectedOptionsLabel
              handleRemove={onOptionDeselect}
              items={getSelectedOptionsItems(options, selectedOptionsIds)}
            />
          ) : (
            <Ellipsis style={{ minHeight: '28px', maxWidth: 'calc(100% - 25px)' }}>
              {activeOption ? activeOption.name : label}
            </Ellipsis>
          )}
          <Icon
            name='arrowTop'
            className={ARROW_ICON_CLASSNAME}
            size={20}
            color={disabled ? 'black.base' : undefined}
            style={disabled ? { opacity: 0.05 } : {}}
          />
        </DropdownTriggerWrapper>
        {isExpanded && (
          <OptionsGroup
            submitHandler={this.handleSubmit}
            selectedOption={activeOption}
            {...pick(SHARED_PROPS, this.props)}
          />
        )}
      </DropdownWrapper>
    )
  }
}

const { Component, globalClassName } = enhanceWithClickOutside(attachClassName(Dropdown))

export const DROPDOWN_CLASSNAME = globalClassName

export default Component
