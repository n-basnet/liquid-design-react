import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedBadge, Badge } from '~/components/Badge'
import { getBackgroundWrapper, includeComponentInPropTable, getTextKnob } from '../helpers'

const defaultText = 'Delivery in 3-4 days'
const defaultProps = { text: getTextKnob({ defaultText }) }

storiesOf('Components/Badge', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Badge, defaultProps))
  .addParameters({
    info: {
      propTablesExclude: [EnhancedBadge, Fragment],
    },
  })
  .add('default', () => <EnhancedBadge {...defaultProps} />)
  .add('disabled', () => <EnhancedBadge {...defaultProps} disabled />)
  .add('default and icon', () => <EnhancedBadge {...defaultProps} icon='circleX' />)
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
  .add('on a ContentCard', () => <EnhancedBadge {...defaultProps} isOnCard icon='circleX' />)
  .add('on a ContentCard - disabled', () => (
    <EnhancedBadge {...defaultProps} isOnCard disabled icon='circleX' />
  ))
  .add('on a ContentCard - right icon', () => (
    <EnhancedBadge {...defaultProps} isOnCard isIconOnRight icon='circleX' />
  ))
  .add('on a ContentCard - right icon disabled', () => (
    <EnhancedBadge {...defaultProps} isOnCard isIconOnRight disabled icon='circleX' />
  ))
