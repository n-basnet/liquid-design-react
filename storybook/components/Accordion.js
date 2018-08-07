import React from 'react'
import { storiesOf } from '@storybook/react'

import { Accordion } from '~'
import { getBackgroundWrapper } from '../helpers'

const title = 'Section title'
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

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
