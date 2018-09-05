import React from 'react'
import { storiesOf } from '@storybook/react'

import { Quote } from '~'
import { getTextKnob } from '../helpers'

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

storiesOf('Components/Quote/Default Quote', module).add('default', () => (
  <Quote
    author={getAuthor()}
    imagePath={getImagePath()}
    source={getSource()}
    quotation={getQuotation()}
  />
))

storiesOf('Components/Quote/Typographic Quote', module)
  .add('Big', () => (
    <Quote
      author={getAuthor()}
      big
      source={getSource()}
      quotation={getQuotationForTypographicQuote()}
    />
  ))
  .add('Small', () => (
    <Quote
      author={getAuthor()}
      small
      source={getSource()}
      quotation={getQuotationForTypographicQuote()}
    />
  ))
