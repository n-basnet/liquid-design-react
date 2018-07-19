import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { pick } from 'ramda'

import Icon from '~/elements/Icon'
import { Flex } from '~/components/primitives/Flex'
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_CONFIG,
  NOTIFICATION_WRAPPER_PADDING,
} from '~/components/Notifications/consts'
import { media } from '~/utils/styling'

const getNotificationType = props =>
  Object.keys(pick(NOTIFICATION_TYPES, props))[0]

const getBackgroundColor = ({ theme, ...props }, hover = false) => {
  const type = getNotificationType(props)
  const color = type ? NOTIFICATION_CONFIG[type].color : 'primary'

  return theme.colors[color][hover ? 'dark' : 'base']
}

const getIconName = props => {
  const type = getNotificationType(props)

  return type && NOTIFICATION_CONFIG[type].icon
}

const SingleNotificationWrapper = styled.div`
  pointer-events: none;
`

const getColor = props => (props.info ? 'black' : 'white')

const STANDARD_WIDTH = 500

const SingleNotificationInnerWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 15px;
  font-weight: 900;
  font-size: 14px;
  line-height: 1;
  pointer-events: auto;
  width: 100%;
  ${media.customMin(STANDARD_WIDTH + NOTIFICATION_WRAPPER_PADDING * 2)`
    width: ${STANDARD_WIDTH}px;
  `};
  ${props => css`
    color: ${props.theme.colors[getColor(props)]};
    background-color: ${getBackgroundColor(props)};
    border-radius: ${props.theme.borderRadius};
    box-shadow: ${props.theme.boxShadow};
    transition: ${props.theme.transition};
    &:hover {
      background-color: ${getBackgroundColor(props, true)};
    }
  `};
`

const TextWrapper = styled.span`
  padding-right: 10px;
`

const SingleNotification = props => {
  const { text, info, id, getRemoveHandler } = props
  const iconName = getIconName(props)
  const iconColor = getColor(props)
  return (
    <SingleNotificationWrapper>
      <SingleNotificationInnerWrapper {...pick(NOTIFICATION_TYPES, props)}>
        <Flex centerY>
          {iconName && (
            <Icon color={iconColor} name={iconName} size={info ? 16 : 20} />
          )}
          <TextWrapper style={iconName ? { paddingLeft: '10px' } : {}}>
            {text}
          </TextWrapper>
        </Flex>
        <Icon
          color={iconColor}
          name='close'
          size={20}
          onClick={getRemoveHandler(id)}
        />
      </SingleNotificationInnerWrapper>
    </SingleNotificationWrapper>
  )
}

SingleNotification.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  getRemoveHandler: PropTypes.func.isRequired,
  reminder: PropTypes.bool,
  error: PropTypes.bool,
  info: PropTypes.bool,
}

export default SingleNotification
