import React from 'react'
import { storiesOf } from '@storybook/react'

import EnhancedQuote, { Quote } from '../../src/components/Quote'
import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  includeComponentInPropTable,
  getSnippetTemplate,
} from '../helpers'

const getAuthor = () =>
  getTextKnob({ name: 'author', defaultText: 'Neville Brody' })
const getImagePath = () =>
  getTextKnob({
    name: 'imagePath',
    defaultText:
      'https://swh-826d.kxcdn.com/wp-content/uploads/2011/05/Neville-Brody.jpg',
  })
const getQuotation = () =>
  getTextKnob({
    name: 'quotation',
    defaultText:
      'Digital design is like painting, except the paint never dries ever again.',
  })
const getQuotationForTypographicQuote = () =>
  getTextKnob({
    name: 'quotation',
    defaultText:
      'Digital design is like painting, except the paint never dries.',
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

const getQuoteSnippet = props => `
  <Quote
    author="Neville Brody"
    ${props || ''}
    source="http://merck.design"
    quotation="Digital design is like painting, except the paint …"
  />
`

const propTableDecorator = includeComponentInPropTable(Quote, defaultProps)

storiesOf('Components/Quote/Default Quote', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(propTableDecorator)
  .addParameters(params)

  .add(
    'default',
    () => (
      <EnhancedQuote
        author={getAuthor()}
        imagePath={getImagePath()}
        source={getSource()}
        quotation={getQuotation()}
      />
    ),
    getSnippetTemplate(
      getQuoteSnippet(
        'imagePath="https://swh-826d.kxcdn.com/wp-content/uploads/2011…"',
      ),
    ),
  )

storiesOf('Components/Quote/Typographic Quote', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(propTableDecorator)
  .addParameters(params)

  .add(
    'Big',
    () => (
      <EnhancedQuote
        author={getAuthor()}
        big
        source={getSource()}
        quotation={getQuotationForTypographicQuote()}
      />
    ),
    getSnippetTemplate(getQuoteSnippet('big')),
  )
  .add(
    'Small',
    () => (
      <EnhancedQuote
        author={getAuthor()}
        small
        source={getSource()}
        quotation={getQuotationForTypographicQuote()}
      />
    ),
    getSnippetTemplate(getQuoteSnippet('small')),
  )
