import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import styled, { css } from 'styled-components'
import { filter } from 'ramda'
import Animated from 'react-animated-transitions'
import 'animate.css/source/fading_entrances/fadeInDown.css'
import 'animate.css/source/fading_exits/fadeOutUp.css'

import SingleNotification from '~/components/Notifications/SingleNotification'
import { NOTIFICATION_WRAPPER_PADDING } from '~/components/Notifications/consts'

const DEFAULT_AUTO_REMOVE_TIMEOUT = 3000
const ANIMATION_DURATION = 200

const NotificationsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: ${NOTIFICATION_WRAPPER_PADDING}px;
  text-align: center;
  pointer-events: none;
  ${props => css`
    z-index: ${props.theme.zIndex.notifications};
  `};
  .animated {
    animation-duration: ${ANIMATION_DURATION}ms;
  }
`

class Notifications extends React.Component {
  state = {
    items: [],
  }
  static propTypes = {
    /** Timeout after which a notification should disappear */
    autoRemoveTimeout: PropTypes.number,
  }
  static defaultProps = {
    autoRemoveTimeout: DEFAULT_AUTO_REMOVE_TIMEOUT,
  }
  addNotification = notification => {
    const id = uniqid()

    this.setState(({ items }) => ({
      items: [{ ...notification, id }, ...items],
    }))

    if (!notification.error) {
      setTimeout(
        this.removeNotificationHandler(id),
        this.props.autoRemoveTimeout
      )
    }
  }
  removeNotificationHandler = id => () => {
    this.setState(({ items }) => ({
      items: filter(item => item.id !== id, items),
    }))
  }
  render() {
    return (
      <NotificationsWrapper>
        <Animated items>
          {this.state.items.map(item => (
            <Animated
              key={item.id}
              item
              enter='fadeInDown'
              exit='fadeOutUp'
              timeout={ANIMATION_DURATION}
            >
              <SingleNotification
                getRemoveHandler={this.removeNotificationHandler}
                autoRemoveTimeout={this.props.autoRemoveTimeout}
                {...item}
              />
            </Animated>
          ))}
        </Animated>
      </NotificationsWrapper>
    )
  }
}

export default Notifications
