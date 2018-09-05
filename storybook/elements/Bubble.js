import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import { getBackgroundWrapper } from '../helpers'
import { Bubble } from '~'

storiesOf('Elements/Bubble', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => (
    <Bubble label={number('label', 2, { range: true, min: 2, max: 120, step: 4 })} />
  ))
  .add('info', () => <Bubble isInfo />)
  .add('warning', () => <Bubble isWarning />)
  .add('disabled', () => <Bubble label={2} disabled />)
