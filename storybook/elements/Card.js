import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, getTextKnob } from '../helpers'
import { Card } from '~'

storiesOf('Elements/Card', module)
  .addDecorator(getBackgroundWrapper({ dark: true }))
  .add('default', () => <Card>{getTextKnob()}</Card>)
  .add('stacked', () => <Card stacked>{getTextKnob()}</Card>)
  .add('active', () => <Card active>{getTextKnob()}</Card>)
