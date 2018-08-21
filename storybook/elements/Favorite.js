import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { getBackgroundWrapper } from '../helpers'

import { Favorite } from '~'

storiesOf('Elements/Favorite', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => <Favorite onChange={action('toggle favorite')} />)
  .add('disabled', () => <Favorite disabled />)
  .add('active', () => <Favorite active onChange={action('toggle favorite')} />)
