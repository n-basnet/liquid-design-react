import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

import Notifications from '../../src/components/Notifications'
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_WRAPPER_PADDING,
} from '../../src/components/Notifications/consts'
import SingleNotification from '../../src/components/Notifications/SingleNotification'
import {
  getTextKnob,
  getPropTablesExcludeList,
  includeComponentInPropTable,
  formatList,
  getSnippetTemplate,
} from '../helpers'

const DEFAULT_TEXT = 'Notification text'
const getDefaultSingleNotificationProps = (id, asKnob = true) => ({
  text: asKnob
    ? getTextKnob({ defaultText: DEFAULT_TEXT, name: `item ${id}` })
    : DEFAULT_TEXT,
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
const propTablesExclude = getPropTablesExcludeList([
  NotificationApp,
  SingleNotification,
  SingleNotificationsWrapper,
])

const sourceCode = {
  description: `Notifications provide immediate information to the user. This can be confirmations, warnings, or hints.\n
  Notication types can be set via boolean props: ${formatList(
    NOTIFICATION_TYPES,
  )}.\n
  Usage: call \`Notification\`'s \`addNotification\` method via a ref:`,

  notificationSnippet: `
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
`,
}

storiesOf('Components/Notifications', module)
  .addParameters({
    info: {
      source: false,
      propTablesExclude,
      excludedPropTypes: ['className'],
    },
  })
  .add('single', () => (
    <SingleNotificationsWrapper>
      {typesToDisplay.map((v, i) => (
        <SingleNotification
          key={v}
          {...(v && v !== DEFAULT_TYPE && { [v]: true })}
          {...getDefaultSingleNotificationProps(i)}
        />
      ))}
    </SingleNotificationsWrapper>
  ))
  .add('custom color', () => (
    <SingleNotificationsWrapper>
      <SingleNotification
        {...getDefaultSingleNotificationProps(0)}
        color={getTextKnob({ name: 'color', defaultText: '#5AB98F' })}
      />
    </SingleNotificationsWrapper>
  ))
  .add('custom icon', () => (
    <SingleNotificationsWrapper>
      <SingleNotification
        {...getDefaultSingleNotificationProps(0)}
        icon={getTextKnob({ name: 'icon', defaultText: 'energy' })}
      />
    </SingleNotificationsWrapper>
  ))
  .addDecorator(includeComponentInPropTable(Notifications))
  .add(
    'usage in app',
    () => <NotificationApp />,
    getSnippetTemplate(sourceCode.notificationSnippet, sourceCode.description),
  )
