import React from 'react'
import { storiesOf } from '@storybook/react'

import { Badge, Theme } from 'liquid-design-react'

storiesOf('Badge', module)
  .add('with text', () => (
    <Badge text='Delivery in 3-4 days' />
  ))
  .add('using a different theme', () => (
    <Theme themeName='richPurple'>
      <Badge text='Delivery with a new theme' />
    </Theme>
  ))
