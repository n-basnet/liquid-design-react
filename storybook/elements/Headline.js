import React from 'react'
import { storiesOf } from '@storybook/react'

import { Headline } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const defaultText = 'Our pursuit is progress for people.'

storiesOf('Elements/Headline', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '830px' } }))
  .add('XH1', () => (
    <Headline size='XH1'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('XH2', () => (
    <Headline size='XH2'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('XH3', () => (
    <Headline size='XH3'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('XH4', () => (
    <Headline size='XH4'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('XH5', () => (
    <Headline size='XH5'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('XH6', () => (
    <Headline size='XH6'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('H1', () => <Headline>{getTextKnob({ defaultText })}</Headline>)
  .add('H2', () => (
    <Headline size='H2'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('H3', () => (
    <Headline size='H3'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('H4', () => (
    <Headline size='H4'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('H5', () => (
    <Headline size='H5'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('H6', () => (
    <Headline size='H6'>{getTextKnob({ defaultText })}</Headline>
  ))

storiesOf('Elements/Brand Headline', module)
  .addDecorator(getBackgroundWrapper())
  .add('XBH1', () => (
    <Headline size='XBH1'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('XBH2', () => (
    <Headline size='XBH2'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('XBH3', () => (
    <Headline size='XBH3'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('BH1', () => (
    <Headline size='BH1'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('BH2', () => (
    <Headline size='BH2'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('BH3', () => (
    <Headline size='BH3'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('BH4', () => (
    <Headline size='BH4'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('BH5', () => (
    <Headline size='BH5'>{getTextKnob({ defaultText })}</Headline>
  ))
  .add('BH6', () => (
    <Headline size='BH6'>{getTextKnob({ defaultText })}</Headline>
  ))
