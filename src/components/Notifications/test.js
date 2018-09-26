import React, { PureComponent } from 'react'
import { mount } from 'enzyme'

import Theme from '~/Theme'
import Notifications from '.'
import { NOTIFICATION_TYPES } from './consts'
import { everyComponentTestSuite } from '~/utils/testUtils'

const notificationText = 'some text'

const getNotification = type => ({
  text: notificationText,
  [type]: true,
})

class NotificationApp extends PureComponent {
  render() {
    return (
      <Theme>
        <Notifications
          ref={v => {
            this.notificationsRef = v
          }}
          {...this.props}
        />
      </Theme>
    )
  }
}

describe('Notifications', () => {
  jest.useFakeTimers()

  let notificationsRef
  let notificationsWrapper
  const getNotificationsWrapper = props => mount(<NotificationApp {...props} />)

  beforeEach(() => {
    const wrapper = getNotificationsWrapper()
    notificationsWrapper = wrapper.find(Notifications)
    notificationsRef = wrapper.instance().notificationsRef
  })

  NOTIFICATION_TYPES.map(type => {
    it(`adds ${type} notification`, () => {
      notificationsRef.addNotification(getNotification(type))
      expect(notificationsRef.state.items[0]).toMatchObject({ [type]: true })
      expect(notificationsWrapper.text()).toMatch(notificationText)
    })
  })

  it('addNotification: updates state', () => {
    expect(notificationsRef.state.items).toEqual([])

    notificationsRef.addNotification(getNotification('isInfo'))

    expect(notificationsRef.state.items[0]).toMatchObject({
      text: notificationText,
      isInfo: true,
    })
  })

  it('removeNotificationHandler: removes a notification', () => {
    notificationsRef.addNotification(getNotification('isError'))
    const notificationId = notificationsRef.state.items[0].id
    expect(notificationsRef.state.items).toHaveLength(1)
    notificationsRef.removeNotificationHandler(notificationId)()
    expect(notificationsRef.state.items).toHaveLength(0)
  })

  it('removes regular notification after a timeout', () => {
    notificationsRef.addNotification(getNotification('isInfo'))
    expect(notificationsRef.state.items).toHaveLength(1)
    jest.runAllTimers()
    expect(notificationsRef.state.items).toHaveLength(0)
  })

  it('does not remove error notification after a timeout', () => {
    notificationsRef.addNotification(getNotification('isError'))
    expect(notificationsRef.state.items).toHaveLength(1)
    jest.runAllTimers()
    expect(notificationsRef.state.items).toHaveLength(1)
  })

  everyComponentTestSuite(getNotificationsWrapper, Notifications, 'Notifications')
})
