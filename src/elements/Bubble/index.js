import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'
import { fadeIn } from '~/utils/keyframes'
import { cursorValue } from '~/utils/styling'

const bgColorSelector = props => {
  if (props.isInfo) return props.theme.colors.vibrantYellow.base
  if (props.isWarning) return props.theme.colors.richRed.base
  if (props.disabled) return props.theme.colors.sensitiveGrey.darkest
  else return props.theme.colors.primary.base
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

const Bubble = ({ disabled, icon, isInfo, label, isWarning }) => (
  <BubbleWrapper disabled={disabled} isInfo={isInfo} isWarning={isWarning}>
    {label && <Label>{label.toString().length > 2 ? 99 : label}</Label>}
    {isInfo && <Icon color='white.base' name='info' size={16} />}
    {isWarning && <Icon color='white.base' name='warning' size={16} />}
  </BubbleWrapper>
)

Bubble.propTypes = {
  label: PropTypes.number,
  icon: PropTypes.string,
  isInfo: PropTypes.bool,
  isWarning: PropTypes.bool,
  disabled: PropTypes.bool,
}

Bubble.defaultProps = {
  label: null,
  icon: null,
  isInfo: false,
  isWarning: false,
  disabled: false,
}

export default Bubble
