import React from 'react'
import { storiesOf } from '@storybook/react'

import { Badge, Theme } from 'liquid-design-react'

storiesOf('Badge', module)
  .add('with text', () => (
    <Badge text='Delivery in 3-4 days' />
  ))
  .add('disabled', () => (
    <Badge text='Delivery in 3-4 days' disabled />
  ))
  .add('with text and icon', () => (
    <Badge text='Delivery in 3-4 days' icon='favorite' />
  ))
  .add('using a different theme', () => (
    <Theme themeName='richPurple'>
      <Badge text='Delivery in 3-4 days' />
    </Theme>
  ))
