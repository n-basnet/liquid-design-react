import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { default as EnhancedButton, Button } from '~/elements/Button'

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedButton]),
  },
}

storiesOf('Elements/Button/Primary', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Button))
  .addParameters(params)
  .add('primary small', () => <EnhancedButton label='Text' onClick={action('click')} />)
  .add('primary small disabled', () => (
    <EnhancedButton disabled label='Text' onClick={action('click')} />
  ))
  .add('primary small with icon', () => (
    <EnhancedButton icon='circleX' label='Text' onClick={action('click')} />
  ))
  .add('primary small with icon disabled', () => (
    <EnhancedButton disabled icon='circleX' label='Text' onClick={action('click')} />
  ))
  .add('primary small with icon only', () => (
    <EnhancedButton icon='circleX' onClick={action('click')} />
  ))
  .add('primary small with icon only disabled', () => (
    <EnhancedButton disabled icon='circleX' onClick={action('click')} />
  ))
  .add('primary big', () => <EnhancedButton size='big' label='Text' onClick={action('click')} />)
  .add('primary big disabled', () => (
    <EnhancedButton disabled size='big' label='Text' onClick={action('click')} />
  ))
  .add('primary big with icon', () => (
    <EnhancedButton icon='circleX' label='Text' size='big' onClick={action('click')} />
  ))
  .add('primary big with icon disabled', () => (
    <EnhancedButton disabled icon='circleX' label='Text' size='big' onClick={action('click')} />
  ))
  .add('primary big with icon only', () => (
    <EnhancedButton icon='circleX' size='big' onClick={action('click')} />
  ))
  .add('primary big with icon only disabled', () => (
    <EnhancedButton disabled icon='circleX' size='big' onClick={action('click')} />
  ))

storiesOf('Elements/Button/Secondary', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Button))
  .addParameters(params)
  .add('secondary small', () => (
    <EnhancedButton appearance='secondary' label='Text' onClick={action('click')} />
  ))
  .add('secondary small disabled', () => (
    <EnhancedButton appearance='secondary' disabled label='Text' onClick={action('click')} />
  ))
  .add('secondary small with icon', () => (
    <EnhancedButton appearance='secondary' icon='circleX' label='Text' onClick={action('click')} />
  ))
  .add('secondary small with icon disabled', () => (
    <EnhancedButton
      disabled
      appearance='secondary'
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary small with icon only', () => (
    <EnhancedButton appearance='secondary' icon='circleX' onClick={action('click')} />
  ))
  .add('secondary small with icon only disabled', () => (
    <EnhancedButton appearance='secondary' disabled icon='circleX' onClick={action('click')} />
  ))
  .add('secondary big', () => (
    <EnhancedButton appearance='secondary' size='big' label='Text' onClick={action('click')} />
  ))
  .add('secondary big disabled', () => (
    <EnhancedButton
      appearance='secondary'
      disabled
      size='big'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary big with icon', () => (
    <EnhancedButton
      appearance='secondary'
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('secondary big with icon disabled', () => (
    <EnhancedButton
      appearance='secondary'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('secondary big with icon only', () => (
    <EnhancedButton appearance='secondary' icon='circleX' size='big' onClick={action('click')} />
  ))
  .add('secondary big with icon only disabled', () => (
    <EnhancedButton
      appearance='secondary'
      disabled
      icon='circleX'
      size='big'
      onClick={action('click')}
    />
  ))

storiesOf('Elements/Button/Highlight', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Button))
  .addParameters(params)
  .add('highlight small', () => (
    <EnhancedButton appearance='highlight' label='Text' onClick={action('click')} />
  ))
  .add('highlight small disabled', () => (
    <EnhancedButton appearance='highlight' disabled label='Text' onClick={action('click')} />
  ))
  .add('highlight small with icon', () => (
    <EnhancedButton appearance='highlight' icon='circleX' label='Text' onClick={action('click')} />
  ))
  .add('highlight small with icon disabled', () => (
    <EnhancedButton
      appearance='highlight'
      disabled
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight small with icon only', () => (
    <EnhancedButton appearance='highlight' icon='circleX' onClick={action('click')} />
  ))
  .add('highlight small with icon only disabled', () => (
    <EnhancedButton appearance='highlight' disabled icon='circleX' onClick={action('click')} />
  ))
  .add('highlight big', () => (
    <EnhancedButton appearance='highlight' size='big' label='Text' onClick={action('click')} />
  ))
  .add('highlight big disabled', () => (
    <EnhancedButton
      appearance='highlight'
      disabled
      size='big'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight big with icon', () => (
    <EnhancedButton
      appearance='highlight'
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('highlight big with icon disabled', () => (
    <EnhancedButton
      appearance='highlight'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('highlight big with icon only', () => (
    <EnhancedButton appearance='highlight' icon='circleX' size='big' onClick={action('click')} />
  ))
  .add('highlight big with icon only disabled', () => (
    <EnhancedButton
      appearance='highlight'
      disabled
      icon='circleX'
      size='big'
      onClick={action('click')}
    />
  ))

storiesOf('Elements/Button/Ghost', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Button))
  .addParameters(params)
  .add('ghost small', () => (
    <EnhancedButton appearance='ghost' label='Text' onClick={action('click')} />
  ))
  .add('ghost small disabled', () => (
    <EnhancedButton appearance='ghost' disabled label='Text' onClick={action('click')} />
  ))
  .add('ghost big', () => (
    <EnhancedButton appearance='ghost' label='Text' size='big' onClick={action('click')} />
  ))
  .add('ghost big disabled', () => (
    <EnhancedButton appearance='ghost' disabled label='Text' size='big' onClick={action('click')} />
  ))
  .add('ghost small with icon', () => (
    <EnhancedButton appearance='ghost' icon='circleX' label='Text' onClick={action('click')} />
  ))
  .add('ghost small with icon disabled', () => (
    <EnhancedButton
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('ghost small with icon on the right side', () => (
    <EnhancedButton
      appearance='ghost'
      icon='circleX'
      label='Text'
      isIconOnRight
      onClick={action('click')}
    />
  ))
  .add('ghost small with icon on the right side disabled', () => (
    <EnhancedButton
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      isIconOnRight
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon', () => (
    <EnhancedButton
      appearance='ghost'
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon disabled', () => (
    <EnhancedButton
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon on the right', () => (
    <EnhancedButton
      appearance='ghost'
      icon='circleX'
      label='Text'
      size='big'
      isIconOnRight
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon on the right disabled', () => (
    <EnhancedButton
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      isIconOnRight
      onClick={action('click')}
    />
  ))
