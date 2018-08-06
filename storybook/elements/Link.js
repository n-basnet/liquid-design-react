import React from 'react'
import { storiesOf } from '@storybook/react'

import { Link } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const defaultText = 'Text'

storiesOf('Elements/Link', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => <Link>{getTextKnob({ defaultText })}</Link>)
