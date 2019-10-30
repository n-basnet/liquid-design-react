import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Handle as RcHandle } from 'rc-slider'

const StyledHandle = styled.div`
  position: relative;
  top: -8px;
  left: -7px;
  width: 24px;
  height: 24px;
  background-color: ${props => props.theme.colors.white.base};
  border: 1px solid ${props => props.theme.colors.sensitiveGrey.darkest};
  border-radius: 50%;
  transition: ${props => props.theme.transition};
  box-shadow: ${props =>
    props.disabled
      ? 'none'
      : props.dragging
        ? props.theme.doubleBoxShadowSmallHover
        : props.theme.doubleBoxShadowSmall};
  & :hover {
    box-shadow: ${props => !props.disabled && props.theme.doubleBoxShadowSmallHover};
  }
`

const Handle = ({ defaultValue, disabled, dragging, value, ...restProps }) => {
  return (
    <RcHandle value={value} defaultValue={defaultValue} {...restProps}>
      <StyledHandle disabled={disabled} dragging={dragging} />
    </RcHandle>
  )
}

Handle.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  dragging: PropTypes.bool.isRequired,
}

Handle.defaultProps = {
  disabled: false,
  defaultValue: 50,
}

export default Handle
