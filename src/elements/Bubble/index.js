import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'
import { fadeIn } from '~/utils/keyframes'

const bgColorSelector = props => {
  if (props.info) return props.theme.colors.vibrantYellow.base
  if (props.warning) return props.theme.colors.richRed.base
  if (props.disabled) return props.theme.colors.sensitiveGrey.darkest
  else return props.theme.colors.primary.base
}

const BubbleWrapper = styled.div`
  ${props => css`
    opacity: ${props.disabled ? 0.5 : 1};
    background-color: ${bgColorSelector(props)};
  `};
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
  font-weight: 900;
  ${props => css`
    color: ${props.theme.colors.white};
  `};
`

const Bubble = ({ disabled, icon, info, label, warning }) => (
  <BubbleWrapper disabled={disabled} info={info} warning={warning}>
    {label && <Label>{label.toString().length > 2 ? 99 : label}</Label>}
    {info && <Icon color='white' name='info' size={16} />}
    {warning && <Icon color='white' name='warning' size={16} />}
  </BubbleWrapper>
)

Bubble.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  info: PropTypes.bool,
  label: PropTypes.number,
  warning: PropTypes.bool,
}

export default Bubble
