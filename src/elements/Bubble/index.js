import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'

const bgColorSelector = props => {
  if (props.info) return props.theme.colors.vibrantYellow
  if (props.warning) return props.theme.colors.richRed
  if (props.disabled) return props.theme.colors.sensitiveGrey.darkest
  else return props.theme.colors.primary.base
}

const BubbleWrapper = styled.div`
  ${props => css`
    opacity: ${props.disabled ? 0.5 : 1};
    background-color: ${bgColorSelector(props)};
  `};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.span`
  font-size: 18px;
  font-weight: 900;
  ${props => css`
    color: ${props.theme.colors.white};
  `};
`

const Bubble = ({ disabled, icon, info, label, warning }) => (
  <BubbleWrapper disabled={disabled} info={info} warning={warning}>
    {label && <Label maxlength='2'>{label}</Label>}
    {info && <Icon color='white' name='info' size={16} />}
    {warning && <Icon color='white' name='warning' size={16} />}
  </BubbleWrapper>
)

Bubble.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  info: PropTypes.bool,
  label: PropTypes.string,
  warning: PropTypes.bool,
}

export default Bubble
