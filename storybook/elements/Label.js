import React from 'react'
import { storiesOf } from '@storybook/react'

import { Label } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const defaultText = 'Label Text'

storiesOf('Elements/Label', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => <Label>{getTextKnob({ defaultText })}</Label>)
