import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Breadcrumbs } from '~'
import { getBackgroundWrapper } from '../helpers'

const getItems = (modifier = {}) => [
  {
    name: 'Breadcrumb 1',
    onClick: action('click breadcrumb 1'),
  },
  {
    name: 'Breadcrumb 2',
    ...!modifier.disabled && { onClick: action('click breadcrumb 2') },
    ...modifier,
  },
  {
    name: 'Breadcrumb 3',
    onClick: action('click breadcrumb 3'),
  },
]

storiesOf('Components/Breadcrumbs', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => (
    <Breadcrumbs
      items={getItems()}
    />
  ))
  .add('active', () => (
    <Breadcrumbs
      items={getItems()}
      active={1}
    />
  ))
  .add('disabled', () => (
    <Breadcrumbs
      items={getItems({ disabled: true })}
    />
  ))
