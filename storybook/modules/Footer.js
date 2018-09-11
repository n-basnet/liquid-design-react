import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Footer } from '~'
import { getTextKnob } from '../helpers'

const getFooterText = () =>
  getTextKnob({
    name: 'headlineText',
    defaultText: 'Get started today and bring your business idea to life.',
  })
const mainIconName = 'circleX'
const defaultText = 'Label Text'
const labelsTexts = [defaultText, defaultText, defaultText]
const iconsNamesAndActions = [
  { name: 'circleX', onClick: action('click') },
  { name: 'circleX', onClick: action('click') },
  { name: 'circleX', onClick: action('click') },
]

storiesOf('Modules/Footer', module).add('default', () => (
  <Footer
    headlineText={getFooterText()}
    iconsNamesAndActions={iconsNamesAndActions}
    labelsTexts={labelsTexts}
    mainIconName={mainIconName}
  />
))
