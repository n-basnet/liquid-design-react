import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from '~'
import { getBackgroundWrapper } from '../helpers'

storiesOf('Elements/Button/Primary', module)
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
  .add('primary large', () => (
    <Button size='large' label='Text' onClick={action('click')} />
  ))
  .add('primary large disabled', () => (
    <Button disabled size='large' label='Text' onClick={action('click')} />
  ))
  .add('primary large with icon', () => (
    <Button
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('primary large with icon disabled', () => (
    <Button
      disabled
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('primary large with icon only', () => (
    <Button icon='circleX' size='large' onClick={action('click')} />
  ))
  .add('primary large with icon only disabled', () => (
    <Button disabled icon='circleX' size='large' onClick={action('click')} />
  ))

storiesOf('Elements/Button/Secondary', module)
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
  .add('secondary large', () => (
    <Button
      appearance='secondary'
      size='large'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary large disabled', () => (
    <Button
      appearance='secondary'
      disabled
      size='large'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('secondary large with icon', () => (
    <Button
      appearance='secondary'
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('secondary large with icon disabled', () => (
    <Button
      appearance='secondary'
      disabled
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('secondary large with icon only', () => (
    <Button
      appearance='secondary'
      icon='circleX'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('secondary large with icon only disabled', () => (
    <Button
      appearance='secondary'
      disabled
      icon='circleX'
      size='large'
      onClick={action('click')}
    />
  ))

storiesOf('Elements/Button/Highlight', module)
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
  .add('highlight large', () => (
    <Button
      appearance='highlight'
      size='large'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight large disabled', () => (
    <Button
      appearance='highlight'
      disabled
      size='large'
      label='Text'
      onClick={action('click')}
    />
  ))
  .add('highlight large with icon', () => (
    <Button
      appearance='highlight'
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('highlight large with icon disabled', () => (
    <Button
      appearance='highlight'
      disabled
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('highlight large with icon only', () => (
    <Button
      appearance='highlight'
      icon='circleX'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('highlight large with icon only disabled', () => (
    <Button
      appearance='highlight'
      disabled
      icon='circleX'
      size='large'
      onClick={action('click')}
    />
  ))

storiesOf('Elements/Button/Ghost', module)
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
  .add('ghost large', () => (
    <Button
      appearance='ghost'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('ghost large disabled', () => (
    <Button
      appearance='ghost'
      disabled
      label='Text'
      size='large'
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
  .add('ghost large with icon', () => (
    <Button
      appearance='ghost'
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('ghost large with icon disabled', () => (
    <Button
      appearance='ghost'
      disabled
      icon='circleX'
      label='Text'
      size='large'
      onClick={action('click')}
    />
  ))
  .add('ghost large with icon on the right', () => (
    <Button
      appearance='ghost'
      icon='circleX'
      label='Text'
      size='large'
      iconRight
      onClick={action('click')}
    />
  ))
