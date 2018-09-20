import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedHeadline, Headline } from '~/elements/Headline'

const defaultText = 'Our pursuit is progress for people.'
const getDefaultProps = () => ({
  children: getTextKnob({ defaultText }),
})

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedHeadline]),
  },
}

const getHeadlineSnippet = type => `
  <Headline${type ? ` type="${type}"` : ``}>
    Our pursuit is progress for people.
  </Headline>
`
storiesOf('Elements/Headline', module)
  .addDecorator(includeComponentInPropTable(Headline, getDefaultProps()))
  .addParameters(params)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '830px' } }))
  .add(
    'XH1',
    () => <EnhancedHeadline type='XH1' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XH1'))
  )
  .add(
    'XH2',
    () => <EnhancedHeadline type='XH2' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XH2'))
  )
  .add(
    'XH3',
    () => <EnhancedHeadline type='XH3' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XH3'))
  )
  .add(
    'XH4',
    () => <EnhancedHeadline type='XH4' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XH4'))
  )
  .add(
    'XH5',
    () => <EnhancedHeadline type='XH5' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XH5'))
  )
  .add(
    'XH6',
    () => <EnhancedHeadline type='XH6' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XH6'))
  )
  .add(
    'H1',
    () => <EnhancedHeadline {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet())
  )
  .add(
    'H2',
    () => <EnhancedHeadline type='H2' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('H2'))
  )
  .add(
    'H3',
    () => <EnhancedHeadline type='H3' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('H3'))
  )
  .add(
    'H4',
    () => <EnhancedHeadline type='H4' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('H4'))
  )
  .add(
    'H5',
    () => <EnhancedHeadline type='H5' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('H5'))
  )
  .add(
    'H6',
    () => <EnhancedHeadline type='H6' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('H6'))
  )

storiesOf('Elements/Brand Headline', module)
  .addDecorator(includeComponentInPropTable(Headline, getDefaultProps()))
  .addParameters(params)
  .addDecorator(getBackgroundWrapper())
  .add(
    'XBH1',
    () => <EnhancedHeadline type='XBH1' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XBH1'))
  )
  .add(
    'XBH2',
    () => <EnhancedHeadline type='XBH2' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XBH2'))
  )
  .add(
    'XBH3',
    () => <EnhancedHeadline type='XBH3' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('XBH3'))
  )
  .add(
    'BH1',
    () => <EnhancedHeadline type='BH1' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('BH1'))
  )
  .add(
    'BH2',
    () => <EnhancedHeadline type='BH2' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('BH2'))
  )
  .add(
    'BH3',
    () => <EnhancedHeadline type='BH3' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('BH3'))
  )
  .add(
    'BH4',
    () => <EnhancedHeadline type='BH4' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('BH4'))
  )
  .add(
    'BH5',
    () => <EnhancedHeadline type='BH5' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('BH5'))
  )
  .add(
    'BH6',
    () => <EnhancedHeadline type='BH6' {...getDefaultProps()} />,
    getSnippetTemplate(getHeadlineSnippet('BH6'))
  )
