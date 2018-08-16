import React from 'react'
import { storiesOf } from '@storybook/react'

import { Accordion } from '~'
import { getBackgroundWrapper, placeholderText } from '../helpers'

const title = 'Section title'
const content = placeholderText(72)

storiesOf('Components/Accordion', module)
  .addDecorator(getBackgroundWrapper())
  .add('default single', () => <Accordion content={content} title={title} />)
  .add('default stacked', () => (
    <section>
      <Accordion content={content} title={title} />
      <Accordion content={content} title={title} />
      <Accordion content={content} title={title} />
    </section>
  ))
