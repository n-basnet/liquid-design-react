import React from 'react'
import { storiesOf } from '@storybook/react'

import { Badge, Theme } from 'liquid-design-react'
import { getBackgroundWrapper } from '../helpers'

storiesOf('Badge', module)
  .addDecorator(getBackgroundWrapper())
  .add('with text', () => (
    <Badge text='Delivery in 3-4 days' />
  ))
  .add('disabled', () => (
    <Badge text='Delivery in 3-4 days' disabled />
  ))
  .add('with text and icon', () => (
    <Badge text='Delivery in 3-4 days' icon='circleX' />
  ))
  .add('using a different theme', () => (
    <Theme themeName='richPurple'>
      <Badge text='Delivery in 3-4 days' />
    </Theme>
  ))
