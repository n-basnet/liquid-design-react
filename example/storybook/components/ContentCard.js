import React from 'react'
import { storiesOf } from '@storybook/react'

import { ContentCard } from 'liquid-design-react'
import { getBackgroundWrapper, chance } from '../helpers'

const labels = [
  {
    name: 'Label 1',
    value: 'Value / Number 1',
  },
  {
    name: 'Label 2',
    value: 'Value / Number 2',
  },
]

const defaultProps = {
  title: 'Title Name',
  imagePath: 'https://images.unsplash.com/photo-1521028640727-38d16fc99ba1',
  labels,
}

storiesOf('ContentCard', module)
  .addDecorator(getBackgroundWrapper('#e9e9e8'))
  .add('default', () => (
    <ContentCard
      {...defaultProps}
    />
  ))
  .add('stacked', () => (
    <ContentCard
      {...defaultProps}
      stacked
    />
  ))
  .add('active', () => (
    <ContentCard
      {...defaultProps}
      active
    />
  ))
  .add('with single label', () => (
    <ContentCard
      {...defaultProps}
      labels={[labels[0]]}
    />
  ))
  .add('with description and featured', () => (
    <ContentCard
      {...defaultProps}
      description={chance.paragraph({ sentences: 1 })}
      featured='e.g. Amount, etc.'
    />
  ))
