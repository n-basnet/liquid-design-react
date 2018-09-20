import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { pick, filter } from 'ramda'

import { Glyph } from '~/elements/Icon'
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_CONFIG,
  NOTIFICATION_WRAPPER_PADDING,
} from '~/components/Notifications/consts'
import { media } from '~/utils/styling'
import attachClassName from '~/components/aux/hoc/attachClassName'

export const getNotificationType = props =>
  Object.keys(filter(v => !!v, pick(NOTIFICATION_TYPES, props)))[0]

const getBackgroundColor = ({ theme, color, ...props }, hover = false) => {
  if (color) {
    return color
  }
  const type = getNotificationType(props)
  const colorName = type ? NOTIFICATION_CONFIG[type].color : 'primary'

  return theme.colors[colorName][hover ? 'dark' : 'base']
}

const getIconName = props => {
  const type = getNotificationType(props)

  return type && NOTIFICATION_CONFIG[type].icon
}

const SingleNotificationWrapper = styled.div`
  pointer-events: none;
`

const getColor = props => (props.isInfo ? 'black' : 'white')

const STANDARD_WIDTH = 500

const SingleNotificationInnerWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1;
  pointer-events: auto;
  width: 100%;
  ${media.customMin(STANDARD_WIDTH + NOTIFICATION_WRAPPER_PADDING * 2)`
    width: ${STANDARD_WIDTH}px;
  `};
  ${props => css`
    color: ${props.theme.colors[getColor(props)].base};
    background-color: ${getBackgroundColor(props)};
    border-radius: ${props.theme.borderRadius};
    box-shadow: ${props.theme.boxShadow};
    transition: ${props.theme.transition};
    font-weight: ${props.theme.fontWeight.black};
    &:hover {
      background-color: ${getBackgroundColor(props, true)};
    }
  `};
`

const TextWrapper = styled.span`
  padding-right: 10px;
`

const SingleNotificationLeftInnerWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SingleNotification = props => {
  const { text, isInfo, id, getRemoveHandler, ...passedProps } = props
  const iconName = getIconName(props)
  const iconColor = `${getColor(props)}.base`
  return (
    <SingleNotificationWrapper>
      <SingleNotificationInnerWrapper {...pick(NOTIFICATION_TYPES, props)} {...passedProps}>
        <SingleNotificationLeftInnerWrapper>
          {iconName && <Glyph color={iconColor} name={iconName} size={isInfo ? 16 : 20} />}
          <TextWrapper style={iconName ? { paddingLeft: '10px' } : {}}>{text}</TextWrapper>
        </SingleNotificationLeftInnerWrapper>
        <Glyph color={iconColor} name='close' size={20} onClick={getRemoveHandler(id)} />
      </SingleNotificationInnerWrapper>
    </SingleNotificationWrapper>
  )
}

SingleNotification.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  getRemoveHandler: PropTypes.func.isRequired,
  isReminder: PropTypes.bool,
  isError: PropTypes.bool,
  isInfo: PropTypes.bool,
}

SingleNotification.defaultProps = {
  isReminder: false,
  isError: false,
  isInfo: false,
}

const { Component } = attachClassName(SingleNotification)

export default Component
