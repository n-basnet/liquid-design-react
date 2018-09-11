import React, { Fragment, PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

import Notifications from '~/components/Notifications'
import { NOTIFICATION_TYPES, NOTIFICATION_WRAPPER_PADDING } from '~/components/Notifications/consts'
import SingleNotification from '~/components/Notifications/SingleNotification'
import { getTextKnob, formatList, includeComponentInPropTable } from '../helpers'

const DEFAULT_TEXT = 'Notification text'
const getDefaultSingleNotificationProps = (id, asKnob = true) => ({
  text: asKnob ? getTextKnob({ defaultText: DEFAULT_TEXT, name: `item ${id}` }) : DEFAULT_TEXT,
  id: id.toString(),
  getRemoveHandler: id => action(`remove ${id}`),
})

const DEFAULT_TYPE = 'default'
const typesToDisplay = [DEFAULT_TYPE, ...NOTIFICATION_TYPES]

class NotificationApp extends PureComponent {
  createNotification = (type, id) => {
    this.notificationsRef.addNotification({
      text: getDefaultSingleNotificationProps(id, false).text,
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
              onClick={() => this.createNotification(type, i)}
              style={{ margin: '5px' }}
            >
              display {type.replace(/^is/, '').toLowerCase()}
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
      {typesToDisplay.map((v, i) => (
        <SingleNotification
          key={v}
          {...v && v !== DEFAULT_TYPE && { [v]: true }}
          {...getDefaultSingleNotificationProps(i)}
        />
      ))}
    </SingleNotificationsWrapper>
  ))
  .addDecorator(includeComponentInPropTable(Notifications))
  .add('usage in app', () => <NotificationApp />, {
    info: {
      text: `
    Notifications provide immediate information to the user. Those information can be confirmations, warnings, or hints.

    Notication types can be set via boolean props: ${formatList(NOTIFICATION_TYPES)}.

    Usage: call \`Notification\`'s \`addNotification\` method via a ref:

    ~~~js
    class NotificationApp extends PureComponent {
      createNotification = () => {
        this.notificationsRef.addNotification({ text: 'Some info', isInfo: true })
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
