import React from 'react'
import { storiesOf } from '@storybook/react'

import { Faq } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'
import { times } from '~/utils/aux'

const headlinesTexts = {
  primary: getTextKnob({
    defaultText: 'Insert Headline',
    name: 'primary headline',
  }),
  secondary: getTextKnob({
    defaultText:
      "We've been around for 350 years, yet our majority owners are still the descendants of Friedrich Jacob Merck.",
    name: 'primary headline',
  }),
}
const getAccordionContent = id => ({
  content: getTextKnob({
    defaultText:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci',
    name: `content ${id}`,
  }),
  title: getTextKnob({ defaultText: 'Section title', name: `title ${id}` }),
})

const getFaqContent = () => times(6).map(getAccordionContent)

const faqContent = getFaqContent()

storiesOf('Modules/Faq', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '1016px' } }))
  .add('default', () => (
    <Faq faqContent={faqContent} headlinesTexts={headlinesTexts} />
  ))
