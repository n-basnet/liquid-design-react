import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { pick, path } from 'ramda'

import attachClassName from '~/components/aux/hoc/attachClassName'
import { cursorValue } from '~/utils/styling'
import { getFirstTruthyKeyName } from '~/utils/aux'

const getBackgroundColor = props => {
  const showOverdue = props.isOverdue && !props.disabled
  return path(
    showOverdue
      ? [props.useThemeColors ? 'secondary' : 'richRed', 'lightest']
      : ['sensitiveGrey', 'base'],
    props.theme.colors
  )
}

const getBarColor = props => {
  const colorsMap = {
    disabled: ['sensitiveGrey', 'darker'],
    isOverdue: [props.useThemeColors ? 'secondary' : 'richRed', 'base'],
  }
  const defaultColor = [props.useThemeColors ? 'primary' : 'vibrantGreen', 'base']
  return path(
    colorsMap[getFirstTruthyKeyName(pick(Object.keys(colorsMap), props))] || defaultColor,
    props.theme.colors
  )
}

const getBarWidth = props => (props.isFull ? 100 : props.displayValue)

const LinearProgressBarWrapper = styled.div`
  position: relative;
  height: 10px;
  width: 300px;
  max-width: 100%;
  border-radius: 10px;
  overflow: hidden;
  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 100%;
  }
  ${props => css`
    ${cursorValue};
    background-color: ${getBackgroundColor(props)};
    &:before,
    &:after {
      transition: ${props.theme.transition};
      background-color: ${getBarColor(props)};
    }
    &:before {
      left: 0;
      opacity: ${props.isOverdue ? 0 : 1};
      width: ${props.isOverdue ? 0 : getBarWidth(props)}%;
    }
    &:after {
      right: 0;
      opacity: ${props.isOverdue ? 1 : 0};
      width: ${props.isOverdue ? getBarWidth(props) : 0}%;
    }
  `};
`

export const LinearProgressBar = ({ value, ...props }) => (
  <LinearProgressBarWrapper
    isOverdue={value > 100}
    displayValue={value % 100}
    isFull={value === 100 || value >= 200}
    {...props}
  />
)

LinearProgressBar.propTypes = {
  value: PropTypes.number,
  disabled: PropTypes.bool,
  useThemeColors: PropTypes.bool,
}

LinearProgressBar.defaultProps = {
  value: 0,
  disabled: false,
  useThemeColors: false,
}

const { Component } = attachClassName(LinearProgressBar)

export default Component
