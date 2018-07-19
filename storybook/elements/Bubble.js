import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper } from '../helpers'
import { Bubble } from '~'

storiesOf('Elements/Bubble', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => <Bubble label={2} />)
  .add('info', () => <Bubble info />)
  .add('warning', () => <Bubble warning />)
  .add('disabled', () => <Bubble label={2} disabled />)
