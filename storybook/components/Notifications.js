import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

import Notifications from '~/components/Notifications'
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_WRAPPER_PADDING,
} from '~/components/Notifications/consts'
import SingleNotification from '~/components/Notifications/SingleNotification'

const defaultSingleNotificationProps = {
  text: 'Notification text',
  id: '1',
  getRemoveHandler: id => action(`remove ${id}`),
}

const DEFAULT_TYPE = 'default'
const typesToDisplay = [DEFAULT_TYPE, ...NOTIFICATION_TYPES]

class NotificationApp extends React.Component {
  createNotification = type => {
    this.notificationsRef.addNotification({
      text: defaultSingleNotificationProps.text,
      ...(type !== DEFAULT_TYPE && { [type]: true }),
    })
  }
  render() {
    return (
      <div>
        <div style={{ marginTop: '200px', textAlign: 'center' }}>
          {typesToDisplay.map((type, i) => (
            <button
              key={i}
              onClick={() => this.createNotification(type)}
              style={{ margin: '5px' }}
            >
              display {type}
            </button>
          ))}
        </div>

        <Notifications
          ref={v => {
            this.notificationsRef = v
          }}
        />
      </div>
    )
  }
}

const SingleNotificationsWrapper = styled.div`
  padding: ${NOTIFICATION_WRAPPER_PADDING}px;
  text-align: center;
`
const propTablesExclude = [
  NotificationApp,
  Fragment,
  SingleNotification,
  SingleNotificationsWrapper,
]

storiesOf('Components/Notifications', module)
  .addParameters({
    info: {
      source: false,
      propTablesExclude,
    },
  })
  .add('single', () => (
    <SingleNotificationsWrapper>
      {typesToDisplay.map(v => (
        <SingleNotification
          key={v}
          {...v && v !== DEFAULT_TYPE && { [v]: true }}
          {...defaultSingleNotificationProps}
        />
      ))}
    </SingleNotificationsWrapper>
  ))
  .addDecorator(storyFn => (
    <Fragment>
      {/* just to make addon-info aware of the original `Notifications` props */}
      <div style={{ display: 'none' }}>
        <Notifications />
      </div>
      {storyFn()}
    </Fragment>
  ))
  .add('usage in app', () => <NotificationApp />, {
    info: {
      text: `
    Notifications provide immediate information to the user. Those information can be confirmations, warnings, or hints.

    Usage: call \`Notification\`'s \`addNotification\` method via a ref:

    ~~~js
    class NotificationApp extends React.Component {
      createNotification = () => {
        this.notificationsRef.addNotification({ text: 'Some info', info: true })
      }
      render() {
        return (
          <div>
            <button onClick={this.createNotification}>add info</button>
            <Notifications
              ref={v => {
                this.notificationsRef = v
              }}
            />
          </div>
        )
      }
    }
    ~~~
  `,
    },
  })
