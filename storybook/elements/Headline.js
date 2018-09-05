import React from 'react'
import { storiesOf } from '@storybook/react'

import { Headline } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const defaultText = 'Our pursuit is progress for people.'

storiesOf('Elements/Headline', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '830px' } }))
  .add('XH1', () => <Headline type='XH1'>{getTextKnob({ defaultText })}</Headline>)
  .add('XH2', () => <Headline type='XH2'>{getTextKnob({ defaultText })}</Headline>)
  .add('XH3', () => <Headline type='XH3'>{getTextKnob({ defaultText })}</Headline>)
  .add('XH4', () => <Headline type='XH4'>{getTextKnob({ defaultText })}</Headline>)
  .add('XH5', () => <Headline type='XH5'>{getTextKnob({ defaultText })}</Headline>)
  .add('XH6', () => <Headline type='XH6'>{getTextKnob({ defaultText })}</Headline>)
  .add('H1', () => <Headline>{getTextKnob({ defaultText })}</Headline>)
  .add('H2', () => <Headline type='H2'>{getTextKnob({ defaultText })}</Headline>)
  .add('H3', () => <Headline type='H3'>{getTextKnob({ defaultText })}</Headline>)
  .add('H4', () => <Headline type='H4'>{getTextKnob({ defaultText })}</Headline>)
  .add('H5', () => <Headline type='H5'>{getTextKnob({ defaultText })}</Headline>)
  .add('H6', () => <Headline type='H6'>{getTextKnob({ defaultText })}</Headline>)

storiesOf('Elements/Brand Headline', module)
  .addDecorator(getBackgroundWrapper())
  .add('XBH1', () => <Headline type='XBH1'>{getTextKnob({ defaultText })}</Headline>)
  .add('XBH2', () => <Headline type='XBH2'>{getTextKnob({ defaultText })}</Headline>)
  .add('XBH3', () => <Headline type='XBH3'>{getTextKnob({ defaultText })}</Headline>)
  .add('BH1', () => <Headline type='BH1'>{getTextKnob({ defaultText })}</Headline>)
  .add('BH2', () => <Headline type='BH2'>{getTextKnob({ defaultText })}</Headline>)
  .add('BH3', () => <Headline type='BH3'>{getTextKnob({ defaultText })}</Headline>)
  .add('BH4', () => <Headline type='BH4'>{getTextKnob({ defaultText })}</Headline>)
  .add('BH5', () => <Headline type='BH5'>{getTextKnob({ defaultText })}</Headline>)
  .add('BH6', () => <Headline type='BH6'>{getTextKnob({ defaultText })}</Headline>)
