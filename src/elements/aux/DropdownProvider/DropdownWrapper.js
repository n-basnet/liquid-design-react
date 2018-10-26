import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import { cursorValue, media } from '~/utils/styling'
import { OPTIONS_GROUP_CLASSNAME } from '~/elements/aux/OptionsGroup'
import { DROPDOWN_ICON_CLASSNAME } from '~/elements/aux/DropdownProvider'

const ICON_MOBILE_SCALE = 1.27
const getTransformValue = ({ isExpanded, isFilter }, isMobile) =>
  isFilter
    ? css`
        transform: translateY(-2px);
      `
    : css`
        transform: rotate(${isExpanded ? 0 : 180}deg);
        ${media.max.phone`
      transform: scale(${ICON_MOBILE_SCALE}) rotate(${isExpanded ? 0 : 180}deg);
    `};
      `

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

export default styled.div`
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
  ${media.max.phone`
    max-width: 100%;
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

    .${DROPDOWN_ICON_CLASSNAME} {
      margin-top: ${props.inline ? 2 : 3}px;
      margin-left: 3px;
      margin-right: 2px;
      transition: ${props.theme.transition};
      ${getTransformValue(props)};
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
