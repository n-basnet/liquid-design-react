import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedParagraph, Paragraph } from '~/elements/Paragraph'

const defaultText = `We've been around for 350 years, yet our majority owners are still the
descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
breakthrough solutions and technologies.`

const getDefaultProps = () => ({
  children: getTextKnob({ defaultText }),
})

const getParagraphSnippet = type => `
  <Paragraph${type ? ` type="${type}"` : ``}>
    We've been around for 350 years, yet our majority owners are still the
    descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
    Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
    breakthrough solutions and technologies.
  </Paragraph>
  `

storiesOf('Elements/Paragraph', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '570px' } }))
  .addDecorator(includeComponentInPropTable(Paragraph, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedParagraph]),
    },
  })
  .add(
    'X-Large Paragraph',
    () => <EnhancedParagraph type='xl' {...getDefaultProps()} />,
    getSnippetTemplate(getParagraphSnippet('xl'))
  )
  .add(
    'Large Paragraph',
    () => <EnhancedParagraph type='lg' {...getDefaultProps()} />,
    getSnippetTemplate(getParagraphSnippet('lg'))
  )
  .add(
    'Medium Paragraph',
    () => <EnhancedParagraph {...getDefaultProps()} />,
    getSnippetTemplate(getParagraphSnippet())
  )
  .add(
    'Small Paragraph',
    () => <EnhancedParagraph type='sm' {...getDefaultProps()} />,
    getSnippetTemplate(getParagraphSnippet('sm'))
  )
  .add(
    'X-Small Paragraph',
    () => <EnhancedParagraph type='xs' {...getDefaultProps()} />,
    getSnippetTemplate(getParagraphSnippet('xs'))
  )
  .add(
    'Article with three Paragraphs',
    () => (
      <article>
        <EnhancedParagraph type='xs' {...getDefaultProps()} />
        <EnhancedParagraph type='xs' {...getDefaultProps()} />
        <EnhancedParagraph type='xs' {...getDefaultProps()} />
      </article>
    ),
    getSnippetTemplate(`
  <article>
    <Paragraph type="xs">
      We've been around for 350 years, yet our majority owners are still the
      descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
      Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
      breakthrough solutions and technologies.
    </Paragraph>
    <Paragraph type="xs">
      We've been around for 350 years, yet our majority owners are still the
      descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
      Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
      breakthrough solutions and technologies.
    </Paragraph>
    <Paragraph type="xs">
      We've been around for 350 years, yet our majority owners are still the
      descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
      Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
      breakthrough solutions and technologies.
    </Paragraph>
  </article>
    `)
  )
  .add(
    'Paragraph with a Link',
    () => (
      <EnhancedParagraph>
        {getTextKnob({ defaultText })} <a>Read More</a>
      </EnhancedParagraph>
    ),
    getSnippetTemplate(`
  <Paragraph>
    We've been around for 350 years, yet our majority owners are still the
    descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668.
    Since then, we have become a truly global company, with 52,000 employees in 66 countries working on
    breakthrough solutions and technologies.

    <a>
      Read More
    </a>
  </Paragraph>
    `)
  )
