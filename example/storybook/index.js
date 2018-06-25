import React from 'react'
import { storiesOf } from '@storybook/react'

import { Badge } from 'liquid-design-react'

storiesOf('Badge', module)
  .add('with text', () => (
    <Badge text='Delivery in 3-4 days' />
  ))
