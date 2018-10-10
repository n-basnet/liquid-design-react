import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { default as EnhancedHeader, Header } from '~/modules/Header'
import Logo from '~/elements/Logo'
import { getTextKnob, getSnippetTemplate, getPropTablesExcludeList } from '../helpers'

const LogoComponent = <Logo color='secondary.base' size={42} />
const buttonIcon = 'circleX'
const getHeaderText = () => getTextKnob({ name: 'headerText', defaultText: 'Room 01' })
const getButtonLabel = () => getTextKnob({ name: 'buttonLabel', defaultText: 'Text' })

storiesOf('Modules/Headers', module)
  .addParameters({
    info: {
      propTables: [Header],
      propTablesExclude: getPropTablesExcludeList([EnhancedHeader]),
    },
  })
  .add(
    'default',
    () => <EnhancedHeader logoComponent={LogoComponent} />,
    getSnippetTemplate(`
  <Header
    logoComponent={<Logo />}
  />
  `)
  )
  .add(
    'with icons',
    () => (
      <EnhancedHeader
        logoComponent={LogoComponent}
        withIcons
        notificationOnClick={action('click')}
        infoOnClick={action('click')}
        settingsOnClick={action('click')}
      />
    ),
    getSnippetTemplate(`
  <Header
    logoComponent={<Logo />}
    withIcons
    notificationOnClick={onClickHandler}
    infoOnClick={onClickHandler}
    settingsOnClick={onClickHandler}
  />
  `)
  )
  .add(
    'with text',
    () => (
      <EnhancedHeader
        logoComponent={LogoComponent}
        withText
        labelOne={getHeaderText()}
        labelTwo={getHeaderText()}
      />
    ),
    getSnippetTemplate(`
  <Header
    logoComponent={<Logo />}
    withText
    labelOne="Room 01"
    labelTwo="Room 01"
  />`)
  )
  .add(
    'with button',
    () => (
      <EnhancedHeader
        logoComponent={LogoComponent}
        withButton
        buttonIcon={buttonIcon}
        buttonLabel={getButtonLabel()}
        buttonOnClick={action('click')}
      />
    ),
    getSnippetTemplate(`
  <Header
    logoComponent={<Logo />}
    withButton
    buttonIcon="circleX"
    buttonLabel="Text"
    buttonOnClick={onClickHandler}
  />
    `)
  )
