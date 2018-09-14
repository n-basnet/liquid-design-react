import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import { default as EnhancedContentCard, ContentCard } from '~/components/ContentCard'
import { CARD_CLASSNAME } from '~/elements/Card'
import {
  getPropTablesExcludeList,
  getBackgroundWrapper,
  getTextKnob,
  includeComponentInPropTable,
} from '../helpers'
import { media } from '~/utils/styling'

const StoryWrapper = styled.div`
  ${media.min.phone`
    .${CARD_CLASSNAME} {
      min-width: 300px;
    }
  `};
`

const defaultText = 'Delivery in 3-4 days'

const getLabels = () => [
  {
    name: getTextKnob({
      name: 'label 1 name',
      defaultText: 'Label 1',
    }),
    value: getTextKnob({
      name: 'label 1 value',
      defaultText: 'Value / Number 1',
    }),
  },
  {
    name: getTextKnob({
      name: 'label 2 name',
      defaultText: 'Label 2',
    }),
    value: getTextKnob({
      name: 'label 2 value',
      defaultText: 'Value / Number 2',
    }),
  },
]

const getDefaultProps = () => ({
  title: getTextKnob({
    name: 'title',
    defaultText: 'Title Name',
  }),
  labels: getLabels(),
})

storiesOf('Components/ContentCard', module)
  .addDecorator(storyFn => <StoryWrapper>{storyFn()}</StoryWrapper>)
  .addDecorator(getBackgroundWrapper({ color: 'dark' }))
  .addDecorator(includeComponentInPropTable(ContentCard, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([StoryWrapper, EnhancedContentCard]),
    },
  })
  .add('default', () => <EnhancedContentCard {...getDefaultProps()} />)
  .add('multiple', () => (
    <Fragment>
      <EnhancedContentCard {...getDefaultProps()} />
      <EnhancedContentCard {...getDefaultProps()} />
      <EnhancedContentCard {...getDefaultProps()} />
    </Fragment>
  ))
  .add('default with image', () => (
    <EnhancedContentCard
      imagePath={getTextKnob({
        name: 'image',
        defaultText: 'https://images.unsplash.com/photo-1521028640727-38d16fc99ba1?w=400&h=400',
      })}
      {...getDefaultProps()}
    />
  ))
  .add('stacked', () => <EnhancedContentCard {...getDefaultProps()} stacked />)
  .add('active', () => <EnhancedContentCard {...getDefaultProps()} active />)
  .add('with description and featured', () => (
    <EnhancedContentCard
      {...getDefaultProps()}
      description={getTextKnob({
        placeholderTextLength: 15,
      })}
      featured={getTextKnob({
        name: 'featured text',
        defaultText: 'e.g. Amount, etc.',
      })}
    />
  ))
  .add('with badge', () => (
    <EnhancedContentCard
      {...getDefaultProps()}
      badge={{
        text: getTextKnob({ defaultText }),
      }}
    />
  ))
  .add('with badge with icon', () => (
    <EnhancedContentCard
      {...getDefaultProps()}
      badge={{
        text: getTextKnob({ defaultText }),
        icon: 'star',
      }}
    />
  ))
  .add('with badge with icon on the right side', () => (
    <EnhancedContentCard
      {...getDefaultProps()}
      badge={{
        text: getTextKnob({ defaultText }),
        iconRight: 'star',
      }}
    />
  ))
