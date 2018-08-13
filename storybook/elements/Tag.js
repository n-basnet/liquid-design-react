import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper } from '../helpers'
import { Tag } from '~'

storiesOf('Elements/Tag', module)
  .addDecorator(getBackgroundWrapper())
  .add('solid', () => <Tag label='Tag Label' />)
  .add('solid disabled', () => <Tag disabled label='Tag Label' />)
  .add('outline', () => <Tag label='Tag Label' outline />)
  .add('outline disabled', () => <Tag disabled label='Tag Label' outline />)
