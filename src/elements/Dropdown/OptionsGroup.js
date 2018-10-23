/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { pick, contains } from 'ramda'

import { media, customWebKitScrollBar, disableTextSelectionBackground } from '~/utils/styling'
import Checkbox, { CHECKBOX_CLASSNAME } from '~/elements/Checkbox'
import {
  dropdownPropTypes,
  dropdownDefaultProps,
  optionPropType,
  SHARED_PROPS,
} from '~/elements/Dropdown/props'
import Ellipsis from '~/components/aux/Ellipsis'
import { getClassName } from '~/components/aux/hoc/attachClassName'

export const OPTIONS_GROUP_CLASSNAME = getClassName({ name: 'OptionsGroup' })

const OptionsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  max-height: 165px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: auto;
  ${customWebKitScrollBar};
  ${media.max.phone`
    max-height: 205px;
  `};
  ${props => css`
    background-color: ${props.theme.colors.white.base};
    box-shadow: ${props.theme.doubleBoxShadow};
  `};
  ${props =>
    props.inline
      ? css`
          background-color: ${props.theme.colors.white.base};
          border-radius: ${props.theme.borderRadius};
          box-shadow: ${props.theme.doubleBoxShadow};
        `
      : css`
          border-bottom-left-radius: ${props.theme.borderRadius};
          border-bottom-right-radius: ${props.theme.borderRadius};
        `};
`

const PADDING_BOTTOM = {
  DESKTOP: 8,
  MOBILE: 10,
}
const BORDER_WIDTH = 1

export const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 15px ${PADDING_BOTTOM.DESKTOP}px;
  ${disableTextSelectionBackground};
  ${media.max.phone`
    padding: 12px ${PADDING_BOTTOM.MOBILE}px 10px 15px;
  `};
  ${props => css`
    border-bottom: ${BORDER_WIDTH}px solid ${props.theme.colors.sensitiveGrey.base};
    transition: ${props.theme.transition};
    cursor: pointer;
    &:last-child {
      border-bottom: none;
      padding-bottom: ${PADDING_BOTTOM.DESKTOP + BORDER_WIDTH}px;
      ${media.max.phone`
        padding-bottom: ${PADDING_BOTTOM.MOBILE + BORDER_WIDTH}px;
      `};
    }
    &:hover {
      color: ${props.theme.colors.primary.base};
      font-weight: ${props.theme.fontWeight.black};
      .${CHECKBOX_CLASSNAME} svg {
        fill: ${props.theme.colors.primary.base};
      }
    }
    &:hover {
      background-color: ${props.theme.colors.sensitiveGrey.base};
    }
    &:focus {
      outline: none;
    }
    .${CHECKBOX_CLASSNAME} {
      margin-top: -2px;
      margin-right: 7px;
      svg {
        transition: ${props.theme.transition};
        fill: ${props.theme.colors.sensitiveGrey.dark};
      }
    }
    ${props.isSelected &&
      css`
        color: ${props.theme.colors.primary.base};
        font-weight: ${props.theme.fontWeight.black};
        background-color: ${props.theme.colors.sensitiveGrey.dark};
        .${CHECKBOX_CLASSNAME} svg {
          fill: ${props.theme.colors.primary.base};
        }
      `};
    ${props.multiselect &&
      css`
        padding: 8px 9px 9px;
      `};
    ${props.inline &&
      css`
        padding-left: ${props.multiselect ? 15 : 20}px;
      `};
  `};
`

const getKeyDownHandler = handler => e => e.key === 'Enter' && handler && handler()

const getOptionActionHandler = (option, submitHandler) => () => {
  submitHandler && submitHandler(option)
  option.onClick && option.onClick(option)
}

const OptionsGroup = ({
  options,
  inline,
  multiselect,
  selectedOptionsIds,
  submitHandler,
  selectedOption,
}) => (
  <OptionsWrapper inline={inline} className={OPTIONS_GROUP_CLASSNAME}>
    {options.map(option => {
      const isSelected = selectedOption === option || contains(option.id, selectedOptionsIds)
      const handleAction = getOptionActionHandler(option, submitHandler)
      return (
        <ResultWrapper
          tabIndex='0'
          role='button'
          key={option.id}
          onClick={handleAction}
          onKeyDown={getKeyDownHandler(handleAction)}
          multiselect={multiselect}
          isSelected={isSelected}
          inline={inline}
        >
          {multiselect && <Checkbox isChecked={isSelected} />}
          <Ellipsis>{option.name}</Ellipsis>
        </ResultWrapper>
      )
    })}
  </OptionsWrapper>
)

OptionsGroup.propTypes = {
  submitHandler: PropTypes.func,
  selectedOption: PropTypes.shape(optionPropType),
  ...pick(SHARED_PROPS, dropdownPropTypes),
}
OptionsGroup.defaultProps = {
  submitHandler: () => {},
  selectedOption: {},
  ...pick(SHARED_PROPS, dropdownDefaultProps),
}

export default OptionsGroup
