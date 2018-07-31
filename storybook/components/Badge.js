import React from 'react'
import { storiesOf } from '@storybook/react'

import { Badge } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const defaultText = 'Delivery in 3-4 days'

storiesOf('Components/Badge', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => <Badge text={getTextKnob({ defaultText })} />)
  .add('disabled', () => <Badge text={getTextKnob({ defaultText })} disabled />)
  .add('default and icon', () => (
    <Badge text={getTextKnob({ defaultText })} icon='circleX' />
  ))
  .addDecorator(storyFn => (
    <div
      style={{
        position: 'relative',
        maxWidth: '300px',
        height: '50px',
        marginLeft: '40px',
        marginBottom: '50px',
      }}
    >
      {storyFn()}
    </div>
  ))
  .add('on a ContentCard', () => (
    <Badge text={getTextKnob({ defaultText })} onCard icon='circleX' />
  ))
  .add('on a ContentCard - disabled', () => (
    <Badge text={getTextKnob({ defaultText })} onCard disabled icon='circleX' />
  ))
  .add('on a ContentCard - right icon', () => (
    <Badge
      text={getTextKnob({ defaultText })}
      onCard
      iconOnRight
      icon='circleX'
    />
  ))
  .add('on a ContentCard - right icon disabled', () => (
    <Badge
      text={getTextKnob({ defaultText })}
      onCard
      iconOnRight
      disabled
      icon='circleX'
    />
  ))
