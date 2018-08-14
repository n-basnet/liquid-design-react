import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from '~'
import { getBackgroundWrapper } from '../helpers'

storiesOf('Elements/Buttons/Primary', module)
  .addDecorator(getBackgroundWrapper())
  .add('primary small', () => <Button label='Text' onClick={action('click')} />)
  .add('primary small disabled', () => (
    <Button disabled label='Text' onClick={action('click')} />
  ))
  .add('primary small with icon', () => (
    <Button icon='circleX' label='Text' onClick={action('click')} />
  ))
  .add('primary small with icon disabled', () => (
    <Button disabled icon='circleX' label='Text' onClick={action('click')} />
  ))
  .add('primary small with icon only', () => (
    <Button icon='circleX' onClick={action('click')} />
  ))
  .add('primary small with icon only disabled', () => (
    <Button disabled icon='circleX' onClick={action('click')} />
  ))
  .add('primary big', () => (
    <Button size='big' label='Text' onClick={action('click')} />
  ))
  .add('primary big disabled', () => (
    <Button disabled size='big' label='Text' onClick={action('click')} />
  ))
  .add('primary big with icon', () => (
    <Button icon='circleX' label='Text' size='big' onClick={action('click')} />
  ))
  .add('primary big with icon disabled', () => (
    <Button
      disabled
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('primary big with icon only', () => (
    <Button icon='circleX' size='big' onClick={action('click')} />
  ))
  .add('primary big with icon only disabled', () => (
    <Button disabled icon='circleX' size='big' onClick={action('click')} />
  ))

storiesOf('Elements/Buttons/Secondary', module)
  .addDecorator(getBackgroundWrapper())
  .add('secondary small', () => (
    <Button appearance='secondary' label='Text' onClick={action('click')} />
  ))
  .add('secondary small disabled', () => (
    <Button
      appearance='secondary'
      disabled
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary small with icon', () => (
    <Button
      appearance='secondary'
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary small with icon disabled', () => (
    <Button
      disabled
      appearance='secondary'
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary small with icon only', () => (
    <Button appearance='secondary' icon='circleX' onClick={action('click')} />
  ))
  .add('secondary small with icon only disabled', () => (
    <Button
      appearance='secondary'
      disabled
      icon='circleX'
      onClick={action('click')}
    />
  ))
  .add('secondary big', () => (
    <Button
      appearance='secondary'
      size='big'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary big disabled', () => (
    <Button
      appearance='secondary'
      disabled
      size='big'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary big with icon', () => (
    <Button
      appearance='secondary'
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('secondary big with icon disabled', () => (
    <Button
      appearance='secondary'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('secondary big with icon only', () => (
    <Button
      appearance='secondary'
      icon='circleX'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('secondary big with icon only disabled', () => (
    <Button
      appearance='secondary'
      disabled
      icon='circleX'
      size='big'
      onClick={action('click')}
    />
  ))

storiesOf('Elements/Buttons/Highlight', module)
  .addDecorator(getBackgroundWrapper())
  .add('highlight small', () => (
    <Button appearance='highlight' label='Text' onClick={action('click')} />
  ))
  .add('highlight small disabled', () => (
    <Button
      appearance='highlight'
      disabled
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight small with icon', () => (
    <Button
      appearance='highlight'
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight small with icon disabled', () => (
    <Button
      appearance='highlight'
      disabled
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight small with icon only', () => (
    <Button appearance='highlight' icon='circleX' onClick={action('click')} />
  ))
  .add('highlight small with icon only disabled', () => (
    <Button
      appearance='highlight'
      disabled
      icon='circleX'
      onClick={action('click')}
    />
  ))
  .add('highlight big', () => (
    <Button
      appearance='highlight'
      size='big'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight big disabled', () => (
    <Button
      appearance='highlight'
      disabled
      size='big'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight big with icon', () => (
    <Button
      appearance='highlight'
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('highlight big with icon disabled', () => (
    <Button
      appearance='highlight'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('highlight big with icon only', () => (
    <Button
      appearance='highlight'
      icon='circleX'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('highlight big with icon only disabled', () => (
    <Button
      appearance='highlight'
      disabled
      icon='circleX'
      size='big'
      onClick={action('click')}
    />
  ))

storiesOf('Elements/Buttons/Ghost', module)
  .addDecorator(getBackgroundWrapper())
  .add('ghost small', () => (
    <Button appearance='ghost' label='Text' onClick={action('click')} />
  ))
  .add('ghost small disabled', () => (
    <Button
      appearance='ghost'
      disabled
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('ghost big', () => (
    <Button
      appearance='ghost'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('ghost big disabled', () => (
    <Button
      appearance='ghost'
      disabled
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('ghost small with icon', () => (
    <Button
      appearance='ghost'
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('ghost small with icon disabled', () => (
    <Button
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('ghost small with icon on the right side', () => (
    <Button
      appearance='ghost'
      icon='circleX'
      label='Text'
      iconRight
      onClick={action('click')}
    />
  ))
  .add('ghost small with icon on the right side disabled', () => (
    <Button
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      iconRight
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon', () => (
    <Button
      appearance='ghost'
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon disabled', () => (
    <Button
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon on the right', () => (
    <Button
      appearance='ghost'
      icon='circleX'
      label='Text'
      size='big'
      iconRight
      onClick={action('click')}
    />
  ))
  .add('ghost big with icon on the right disabled', () => (
    <Button
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      size='big'
      iconRight
      onClick={action('click')}
    />
  ))
