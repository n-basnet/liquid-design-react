import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { path, isEmpty } from 'ramda'
import { rgba } from 'polished'

import { cursorValue, disableMozTextSelection } from '~/utils/styling'
import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import attachClassName from '~/components/aux/hoc/attachClassName'

const TOGGLE_WIDTH = 60
const TOGGLE_HEIGHT = 35
const TOGGLE_WIDTH_ICONS = 110
const TOGGLE_HEIGHT_ICONS = 40
const TOGGLE_KNOB_PAD = 2
const TOGGLE_KNOB_SIDE = TOGGLE_HEIGHT - TOGGLE_KNOB_PAD * 2
const TOGGLE_KNOB_WIDTH_ICONS = 50
const TOGGLE_KNOB_HEIGHT_ICONS = 36
const ICON_SIZE = 22

const getWidth = props => (props.hasIcons ? TOGGLE_WIDTH_ICONS : TOGGLE_WIDTH)
const getKnobWidth = props => (props.hasIcons ? TOGGLE_KNOB_WIDTH_ICONS : TOGGLE_KNOB_SIDE)
const getKnobHeight = props => (props.hasIcons ? TOGGLE_KNOB_HEIGHT_ICONS : TOGGLE_KNOB_SIDE)
const getActiveColor = props =>
  path(props.isActive ? ['primary', 'base'] : ['sensitiveGrey', 'base'], props.theme.colors)
const getKnobColor = props =>
  props.disabled && props.hasIcons
    ? props.theme.colors.sensitiveGrey.darker
    : props.theme.colors[props.hasIcons ? 'primary' : 'white'].base
const getIconOffset = props => getKnobWidth(props) / 2 - ICON_SIZE / 2 + TOGGLE_KNOB_PAD

const ToggleWrapper = styled.div`
  position: relative;
  border-radius: 50px;
  outline: none;
  &:after {
    content: '';
    position: absolute;
    top: ${TOGGLE_KNOB_PAD}px;
    border-radius: 50px;
    left: ${TOGGLE_KNOB_PAD}px;
  }
  ${props => css`
    width: ${getWidth(props)}px;
    height: ${props.hasIcons ? TOGGLE_HEIGHT_ICONS : TOGGLE_HEIGHT}px;
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
    transition: ${props.theme.transition};
    background-color: ${props.hasIcons
    ? props.theme.colors.sensitiveGrey.base
    : props.disabled ? rgba(props.theme.colors.sensitiveGrey.base, 0.5) : getActiveColor(props)};
    &:after {
      width: ${getKnobWidth(props)}px;
      height: ${getKnobHeight(props)}px;
      transition: ${props.theme.transition};
      background-color: ${getKnobColor(props)};
      ${props.disabled
    ? css`
            opacity: 0.7;
          `
    : css`
            box-shadow: 0 4px 8px 0 ${rgba(props.theme.colors.black.base, 0.05)};
          `};
      ${props.isActive &&
        css`
          transform: translateX(${getWidth(props) - getKnobWidth(props) - TOGGLE_KNOB_PAD * 2}px);
        `};
    }
    ${props.hasIcons &&
      css`
        .${ICON_CLASSNAME} {
          position: absolute;
          top: ${getKnobHeight(props) / 2 - ICON_SIZE / 2 + TOGGLE_KNOB_PAD}px;
          z-index: 1;
          &:nth-child(1) {
            left: ${getIconOffset(props)}px;
          }
          &:nth-child(2) {
            right: ${getIconOffset(props)}px;
          }
          svg {
            transition: ${props.theme.transition};
          }
        }
        .${ICON_CLASSNAME} {
          &:nth-child(1) svg {
            fill: ${path(
    props.isActive ? ['sensitiveGrey', 'darker'] : ['white', 'base'],
    props.theme.colors
  )};
          }
          &:nth-child(2) svg {
            fill: ${path(
    props.isActive ? ['white', 'base'] : ['sensitiveGrey', 'darker'],
    props.theme.colors
  )};
          }
        }
      `};
  `};
  ${props =>
    props.disabled &&
    props.hasIcons &&
    css`
      opacity: 0.5;
    `};

  ${disableMozTextSelection};
`

export const Toggle = ({ icons, onClick, ...props }) => (
  <ToggleWrapper
    hasIcons={!isEmpty(icons)}
    onClick={props.disabled ? null : onClick}
    tabIndex='0'
    role='button'
    {...props}
  >
    {icons[0] && <Glyph name={icons[0]} size={ICON_SIZE} />}
    {icons[1] && <Glyph name={icons[1]} size={ICON_SIZE} />}
  </ToggleWrapper>
)

Toggle.propTypes = {
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icons: PropTypes.arrayOf(PropTypes.string),
}

Toggle.defaultProps = {
  isActive: false,
  disabled: false,
  onClick: () => {},
  icons: [],
}

const { Component } = attachClassName(Toggle)

export default Component
