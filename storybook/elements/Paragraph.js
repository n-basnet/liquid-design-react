import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
} from '../helpers'
import { default as EnhancedParagraph, Paragraph } from '~/elements/Paragraph'

const defaultText = `We've been around for 350 years, yet our majority owners are still the
descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
breakthrough solutions and technologies.`

const getDefaultProps = () => ({
  children: getTextKnob({ defaultText }),
})

storiesOf('Elements/Paragraph', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '570px' } }))
  .addDecorator(includeComponentInPropTable(Paragraph, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedParagraph]),
    },
  })
  .add('X-Large Paragraph', () => <EnhancedParagraph type='xl' {...getDefaultProps()} />)
  .add('Large Paragraph', () => <EnhancedParagraph type='lg' {...getDefaultProps()} />)
  .add('Medium Paragraph', () => <EnhancedParagraph {...getDefaultProps()} />)
  .add('Small Paragraph', () => <EnhancedParagraph type='sm' {...getDefaultProps()} />)
  .add('X-Small Paragraph', () => <EnhancedParagraph type='xs' {...getDefaultProps()} />)
  .add('Article with three Paragraphs', () => (
    <article>
      <EnhancedParagraph type='xs' {...getDefaultProps()} />
      <EnhancedParagraph type='xs' {...getDefaultProps()} />
      <EnhancedParagraph type='xs' {...getDefaultProps()} />
    </article>
  ))
  .add('Paragraph with a Link', () => (
    <EnhancedParagraph>
      {getTextKnob({ defaultText })} <a>Read More</a>
    </EnhancedParagraph>
  ))
