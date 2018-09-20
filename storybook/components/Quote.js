import React from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedQuote, Quote } from '~/components/Quote'
import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  includeComponentInPropTable,
} from '../helpers'

const getAuthor = () => getTextKnob({ name: 'author', defaultText: 'Neville Brody' })
const getImagePath = () =>
  getTextKnob({
    name: 'imagePath',
    defaultText: 'https://swh-826d.kxcdn.com/wp-content/uploads/2011/05/Neville-Brody.jpg',
  })
const getQuotation = () =>
  getTextKnob({
    name: 'quotation',
    defaultText: 'Digital design is like painting, except the paint never dries ever again.',
  })
const getQuotationForTypographicQuote = () =>
  getTextKnob({
    name: 'quotation',
    defaultText: 'Digital design is like painting, except the paint never dries.',
  })
const getSource = () =>
  getTextKnob({
    name: 'source',
    defaultText: 'http://merck.design',
  })

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedQuote]),
  },
}

const defaultProps = {
  author: getAuthor(),
  quotation: getQuotation(),
}
const propTableDecorator = includeComponentInPropTable(Quote, defaultProps)

storiesOf('Components/Quote/Default Quote', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(propTableDecorator)
  .addParameters(params)
  .add('default', () => (
    <EnhancedQuote
      author={getAuthor()}
      imagePath={getImagePath()}
      source={getSource()}
      quotation={getQuotation()}
    />
  ))

storiesOf('Components/Quote/Typographic Quote', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(propTableDecorator)
  .addParameters(params)
  .add('Big', () => (
    <EnhancedQuote
      author={getAuthor()}
      big
      source={getSource()}
      quotation={getQuotationForTypographicQuote()}
    />
  ))
  .add('Small', () => (
    <EnhancedQuote
      author={getAuthor()}
      small
      source={getSource()}
      quotation={getQuotationForTypographicQuote()}
    />
  ))
