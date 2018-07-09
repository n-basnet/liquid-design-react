import React from 'react'
import { storiesOf } from '@storybook/react'

import { Badge } from '~'
import { getBackgroundWrapper } from '../helpers'

storiesOf('Badge', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => (
    <Badge text='Delivery in 3-4 days' />
  ))
  .add('disabled', () => (
    <Badge text='Delivery in 3-4 days' disabled />
  ))
  .add('default and icon', () => (
    <Badge text='Delivery in 3-4 days' icon='circleX' />
  ))
  .addDecorator(storyFn => (
    <div style={{
      position: 'relative',
      maxWidth: '288px',
      height: '50px',
      marginLeft: '30px',
    }}>
      {storyFn()}
    </div>
  ))
  .add('on a ContentCard', () => (
    <Badge text='Delivery in 3-4 days' onCard icon='circleX' />
  ))
  .add('on a ContentCard - disabled', () => (
    <Badge text='Delivery in 3-4 days' onCard disabled icon='circleX' />
  ))
  .add('on a ContentCard - right icon', () => (
    <Badge text='Delivery in 3-4 days' onCard iconOnRight icon='circleX' />
  ))
