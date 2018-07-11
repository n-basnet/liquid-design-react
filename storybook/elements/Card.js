import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, chance } from '../helpers'
import { Card } from '~'

storiesOf('Elements/Card', module)
  .addDecorator(getBackgroundWrapper({ dark: true }))
  .add('default', () => (
    <Card>{chance.paragraph({ sentences: 3 })}</Card>
  ))
  .add('stacked', () => (
    <Card stacked>{chance.paragraph({ sentences: 3 })}</Card>
  ))
  .add('active', () => (
    <Card active>{chance.paragraph({ sentences: 3 })}</Card>
  ))
