import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Glyph } from '~/elements/Icon'
import { fadeIn } from '~/utils/styling/animations'
import { cursorValue } from '~/utils/styling'
import attachClassName from '~/components/aux/hoc/attachClassName'

const bgColorSelector = props => {
  const { theme, isInfo, isWarning, disabled } = props
  if (isInfo) return theme.colors.vibrantYellow.base
  if (isWarning) return theme.colors.richRed.base
  if (disabled) return theme.colors.sensitiveGrey.darkest
  else return theme.colors.primary.base
}

const BubbleWrapper = styled.div`
  ${props => css`
    opacity: ${props.disabled ? 0.5 : 1};
    background-color: ${bgColorSelector(props)};
  `};
  ${cursorValue};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.22s ease-in-out;
`

export const Label = styled.span`
  padding-bottom: 1px;
  font-size: 18px;
  ${props => css`
    color: ${props.theme.colors.white.base};
    font-weight: ${props.theme.fontWeight.black};
  `};
`

export const Bubble = ({ disabled, isInfo, label, isWarning, ...props }) => (
  <BubbleWrapper disabled={disabled} isInfo={isInfo} isWarning={isWarning} {...props}>
    {label && <Label>{label.toString().length > 2 ? 99 : label}</Label>}
    {isInfo && <Glyph color='white.base' name='infoM' size={16} />}
    {isWarning && <Glyph color='white.base' name='warningM' size={16} />}
  </BubbleWrapper>
)

Bubble.propTypes = {
  /** the content to be displayed in the element  */
  label: PropTypes.number,
  /** info styling */
  isInfo: PropTypes.bool,
  /** warning styling */
  isWarning: PropTypes.bool,
  disabled: PropTypes.bool,
}

Bubble.defaultProps = {
  label: null,
  isInfo: false,
  isWarning: false,
  disabled: false,
}

const { Component } = attachClassName(Bubble)

export default Component
