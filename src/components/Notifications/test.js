import React from 'react'
import { mount } from 'enzyme'

import Theme from '~/Theme'
import Notifications from '.'
import { NOTIFICATION_TYPES } from './consts'

const notificationText = 'some text'

const getNotification = type => ({
  text: notificationText,
  [type]: true,
})

class NotificationApp extends React.Component {
  render() {
    return (
      <Theme>
        <Notifications
          ref={v => {
            this.notificationsRef = v
          }}
        />
      </Theme>
    )
  }
}

describe('Notifications', () => {
  jest.useFakeTimers()

  let notificationsRef
  let notificationsWrapper

  beforeEach(() => {
    const wrapper = mount(<NotificationApp />)
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

    notificationsRef.addNotification(getNotification('info'))

    expect(notificationsRef.state.items[0]).toMatchObject({
      text: notificationText,
      info: true,
    })
  })

  it('removeNotificationHandler: removes a notification', () => {
    notificationsRef.addNotification(getNotification('error'))
    const notificationId = notificationsRef.state.items[0].id
    expect(notificationsRef.state.items).toHaveLength(1)
    notificationsRef.removeNotificationHandler(notificationId)()
    expect(notificationsRef.state.items).toHaveLength(0)
  })

  it('removes regular notification after a timeout', () => {
    notificationsRef.addNotification(getNotification('info'))
    expect(notificationsRef.state.items).toHaveLength(1)
    jest.runAllTimers()
    expect(notificationsRef.state.items).toHaveLength(0)
  })

  it('does not remove error notification after a timeout', () => {
    notificationsRef.addNotification(getNotification('error'))
    expect(notificationsRef.state.items).toHaveLength(1)
    jest.runAllTimers()
    expect(notificationsRef.state.items).toHaveLength(1)
  })
})
