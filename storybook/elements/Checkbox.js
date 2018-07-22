import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper } from '../helpers'
import { Checkbox } from '~'

const label = 'Checkbox text'

storiesOf('Elements/Checkbox', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => <Checkbox label={label} />)
  .add('disabled', () => <Checkbox disabled label={label} />)
