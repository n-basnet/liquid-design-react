import React from 'react'
import { storiesOf } from '@storybook/react'

import { Paragraph } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const defaultText = `We've been around for 350 years, yet our majority owners are still the
descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
breakthrough solutions and technologies.`

storiesOf('Elements/Paragraph', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '570px' } }))
  .add('X-Large Paragraph', () => <Paragraph type='xl'>{getTextKnob({ defaultText })}</Paragraph>)
  .add('Large Paragraph', () => <Paragraph type='lg'>{getTextKnob({ defaultText })}</Paragraph>)
  .add('Medium Paragraph', () => <Paragraph>{getTextKnob({ defaultText })}</Paragraph>)
  .add('Small Paragraph', () => <Paragraph type='sm'>{getTextKnob({ defaultText })}</Paragraph>)
  .add('X-Small Paragraph', () => <Paragraph type='xs'>{getTextKnob({ defaultText })}</Paragraph>)
  .add('Article with three Paragraphs', () => (
    <article>
      <Paragraph type='xs'>{getTextKnob({ defaultText })}</Paragraph>
      <Paragraph type='xs'>{getTextKnob({ defaultText })}</Paragraph>
      <Paragraph type='xs'>{getTextKnob({ defaultText })}</Paragraph>
    </article>
  ))
  .add('Paragraph with a Link', () => (
    <Paragraph>
      {getTextKnob({ defaultText })} <a>Read More</a>
    </Paragraph>
  ))
