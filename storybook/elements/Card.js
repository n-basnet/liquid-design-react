import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, placeholderText } from '../helpers'
import { Card } from '~'

storiesOf('Elements/Card', module)
  .addDecorator(getBackgroundWrapper({ dark: true }))
  .add('default', () => <Card>{placeholderText(30)}</Card>)
  .add('stacked', () => <Card stacked>{placeholderText(30)}</Card>)
  .add('active', () => <Card active>{placeholderText(30)}</Card>)
