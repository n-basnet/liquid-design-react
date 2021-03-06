import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import styled from 'styled-components'
import { filter } from 'ramda'
import Animated from 'react-animated-transitions'
import fadeInDownCSSAnimation from 'animate.css/source/fading_entrances/fadeInDown.css'
import fadeOutUpCSSAnimation from 'animate.css/source/fading_exits/fadeOutUp.css'
import cx from 'classnames'

import { Base } from '../../Theme'
import SingleNotification from '../../components/Notifications/SingleNotification'
import { NOTIFICATION_WRAPPER_PADDING } from '../../components/Notifications/consts'
import { getOrCreateDOMNode } from '../../utils/dom'
import { getClassName } from '../../components/misc/hoc/attachClassName'

const DEFAULT_AUTO_REMOVE_TIMEOUT = 3000
const ANIMATION_DURATION = 200
const ANIMATED_ITEM_TIMEOUT = ANIMATION_DURATION * 0.9

const NotificationsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: ${NOTIFICATION_WRAPPER_PADDING}px;
  text-align: center;
  pointer-events: none;
  ${fadeInDownCSSAnimation};
  ${fadeOutUpCSSAnimation};
  .animated {
    animation-duration: ${ANIMATION_DURATION}ms;
  }
`

class Notifications extends PureComponent {
  static propTypes = {
    /** Timeout after which a notification should disappear */
    autoRemoveTimeout: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    autoRemoveTimeout: DEFAULT_AUTO_REMOVE_TIMEOUT,
    className: null,
  }

  state = {
    items: [],
  }

  addNotification = notification => {
    const id = uniqid()

    this.setState(({ items }) => ({
      items: [{ ...notification, id }, ...items],
    }))

    if (!notification.isError) {
      setTimeout(
        this.removeNotificationHandler(id),
        this.props.autoRemoveTimeout,
      )
    }
  }

  removeNotificationHandler = id => () => {
    this.setState(({ items }) => ({
      items: filter(item => item.id !== id, items),
    }))
  }

  getDOMNode = () => getOrCreateDOMNode(getClassName(Notifications))
  render() {
    const { autoRemoveTimeout, className, ...props } = this.props
    return ReactDOM.createPortal(
      // Theme's Base is needed because the component attaches itself directly to the body element
      <Base>
        <NotificationsWrapper
          {...props}
          className={cx(className, getClassName(Notifications))}
        >
          <Animated items>
            {this.state.items.map(item => (
              <Animated
                key={item.id}
                item
                enter="fadeInDown"
                exit="fadeOutUp"
                timeout={ANIMATED_ITEM_TIMEOUT}
              >
                <SingleNotification
                  getRemoveHandler={this.removeNotificationHandler}
                  autoRemoveTimeout={autoRemoveTimeout}
                  {...item}
                />
              </Animated>
            ))}
          </Animated>
        </NotificationsWrapper>
      </Base>,
      this.getDOMNode(),
    )
  }
}

export { SingleNotification }

export default Notifications
