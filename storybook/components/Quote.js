import React from 'react'
import { storiesOf } from '@storybook/react'

import { Quote } from '~'

const author = 'Neville Brody'
const imagePath =
  'https://swh-826d.kxcdn.com/wp-content/uploads/2011/05/Neville-Brody.jpg'
const quotation =
  'Digital design is like painting, except the paint never dries ever again.'
const quotationV2 =
  'Digital design is like painting, except the paint never dries.'
const source = 'http://merck.design'

storiesOf('Components/Quote/Default Quote', module).add('default', () => (
  <Quote
    author={author}
    imagePath={imagePath}
    source={source}
    quotation={quotation}
  />
))

storiesOf('Components/Quote/Typographic Quote', module)
  .add('Big', () => (
    <Quote author={author} big source={source} quotation={quotationV2} />
  ))
  .add('Small', () => (
    <Quote author={author} small source={source} quotation={quotationV2} />
  ))
