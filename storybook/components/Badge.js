import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedBadge, Badge } from '~/components/Badge'
import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'

const defaultText = 'Delivery in 3-4 days'
const defaultProps = { children: getTextKnob({ defaultText }) }

const getBadgeSnippet = props => `
  <Badge${props ? ` ${props}` : ``}>Delivery in 3-4 days</Badge>
`

const getOnCardBadgeSnippet = props => `
  <div style={{
    position: 'relative',
    maxWidth: '300px',
    height: '50px',
    marginLeft: '40px',
    marginBottom: '50px',
  }}>
    <Badge onCard icon="circleX" ${props ? ` ${props}` : ``}>Delivery in 3-4 days</>
  </div>
`

storiesOf('Components/Badge', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Badge, defaultProps))
  .addParameters({
    info: {
      propTablesExclude: [EnhancedBadge, Fragment],
    },
  })
  .add('default', () => <EnhancedBadge {...defaultProps} />, getSnippetTemplate(getBadgeSnippet()))
  .add(
    'disabled',
    () => <EnhancedBadge {...defaultProps} disabled />,
    getSnippetTemplate(getBadgeSnippet('disabled'))
  )
  .add(
    'default and icon',
    () => <EnhancedBadge {...defaultProps} icon='circleX' />,
    getSnippetTemplate(getBadgeSnippet('icon="circleX"'))
  )
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
  .add(
    'on a ContentCard',
    () => <EnhancedBadge {...defaultProps} isOnCard icon='circleX' />,
    getSnippetTemplate(getOnCardBadgeSnippet())
  )
  .add(
    'on a ContentCard - disabled',
    () => <EnhancedBadge {...defaultProps} isOnCard disabled icon='circleX' />,
    getSnippetTemplate(getOnCardBadgeSnippet('disabled'))
  )
  .add(
    'on a ContentCard - right icon',
    () => <EnhancedBadge {...defaultProps} isOnCard isIconOnRight icon='circleX' />,
    getSnippetTemplate(getOnCardBadgeSnippet('iconOnRight'))
  )
  .add(
    'on a ContentCard - right icon disabled',
    () => <EnhancedBadge {...defaultProps} isOnCard isIconOnRight disabled icon='circleX' />,
    getSnippetTemplate(getOnCardBadgeSnippet('iconOnRight disabled'))
  )
