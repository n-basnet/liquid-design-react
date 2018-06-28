import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, chance } from '../helpers'
import { Card } from 'liquid-design-react'

storiesOf('Card', module)
  .addDecorator(getBackgroundWrapper('#e9e9e8'))
  .add('default', () => (
    <Card>{chance.paragraph({ sentences: 3 })}</Card>
  ))
  .add('stacked', () => (
    <Card stacked>{chance.paragraph({ sentences: 3 })}</Card>
  ))
  .add('active', () => (
    <Card active>{chance.paragraph({ sentences: 3 })}</Card>
  ))
