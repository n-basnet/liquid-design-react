import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Header } from '~'
import { getTextKnob } from '../helpers'

const buttonIcon = 'circleX'
const getHeaderText = () =>
  getTextKnob({ name: 'headerText', defaultText: 'Room 01' })
const getButtonLabel = () =>
  getTextKnob({ name: 'buttonLabel', defaultText: 'Text' })

storiesOf('Modules/Headers', module)
  .add('default', () => <Header />)
  .add('with icons', () => (
    <Header
      withIcons
      notificationOnClick={action('click')}
      infoOnClick={action('click')}
      settingsOnClick={action('click')}
    />
  ))
  .add('with text', () => (
    <Header withText labelOne={getHeaderText()} labelTwo={getHeaderText()} />
  ))
  .add('with button', () => (
    <Header
      withButton
      buttonIcon={buttonIcon}
      buttonLabel={getButtonLabel()}
      buttonOnClick={action('click')}
    />
  ))
