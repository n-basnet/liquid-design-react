import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
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

storiesOf('Elements/Headline', module)
  .addDecorator(includeComponentInPropTable(Headline, getDefaultProps()))
  .addParameters(params)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '830px' } }))
  .add('XH1', () => <EnhancedHeadline type='XH1' {...getDefaultProps()} />)
  .add('XH2', () => <EnhancedHeadline type='XH2' {...getDefaultProps()} />)
  .add('XH3', () => <EnhancedHeadline type='XH3' {...getDefaultProps()} />)
  .add('XH4', () => <EnhancedHeadline type='XH4' {...getDefaultProps()} />)
  .add('XH5', () => <EnhancedHeadline type='XH5' {...getDefaultProps()} />)
  .add('XH6', () => <EnhancedHeadline type='XH6' {...getDefaultProps()} />)
  .add('H1', () => <EnhancedHeadline {...getDefaultProps()} />)
  .add('H2', () => <EnhancedHeadline type='H2' {...getDefaultProps()} />)
  .add('H3', () => <EnhancedHeadline type='H3' {...getDefaultProps()} />)
  .add('H4', () => <EnhancedHeadline type='H4' {...getDefaultProps()} />)
  .add('H5', () => <EnhancedHeadline type='H5' {...getDefaultProps()} />)
  .add('H6', () => <EnhancedHeadline type='H6' {...getDefaultProps()} />)

storiesOf('Elements/Brand Headline', module)
  .addDecorator(includeComponentInPropTable(Headline, getDefaultProps()))
  .addParameters(params)
  .addDecorator(getBackgroundWrapper())
  .add('XBH1', () => <EnhancedHeadline type='XBH1' {...getDefaultProps()} />)
  .add('XBH2', () => <EnhancedHeadline type='XBH2' {...getDefaultProps()} />)
  .add('XBH3', () => <EnhancedHeadline type='XBH3' {...getDefaultProps()} />)
  .add('BH1', () => <EnhancedHeadline type='BH1' {...getDefaultProps()} />)
  .add('BH2', () => <EnhancedHeadline type='BH2' {...getDefaultProps()} />)
  .add('BH3', () => <EnhancedHeadline type='BH3' {...getDefaultProps()} />)
  .add('BH4', () => <EnhancedHeadline type='BH4' {...getDefaultProps()} />)
  .add('BH5', () => <EnhancedHeadline type='BH5' {...getDefaultProps()} />)
  .add('BH6', () => <EnhancedHeadline type='BH6' {...getDefaultProps()} />)
