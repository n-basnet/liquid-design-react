import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import EnhancedHeader, { Header } from '../../src/modules/Header'
import Logo from '../../src/elements/Logo'
import {
  getTextKnob,
  getSnippetTemplate,
  getPropTablesExcludeList,
} from '../helpers'

const LogoComponent = <Logo color="secondary.base" size={42} />
const buttonIcon = 'circleX'
const getHeaderText = () =>
  getTextKnob({ name: 'headerText', defaultText: 'Room 01' })
const getButtonLabel = () =>
  getTextKnob({ name: 'buttonLabel', defaultText: 'Text' })

const searchBarOptions = [
  'Search Result 1',
  'Search Result 2',
  'Search Result 3',
  'Search Result 4',
]

storiesOf('Modules/Headers', module)
  .addParameters({
    info: {
      propTables: [Header],
      propTablesExclude: getPropTablesExcludeList([EnhancedHeader]),
    },
  })
  .add(
    'default',
    () => (
      <EnhancedHeader
        searchBarOptions={searchBarOptions}
        logoComponent={LogoComponent}
      />
    ),
    getSnippetTemplate(`
  <Header
    searchBarOptions={[
      'Search Result 1',
      'Search Result 2',
      'Search Result 3',
      'Search Result 4',
    ]}
    logoComponent={<Logo />}
  />
  `),
  )
  .add(
    'with icons',
    () => (
      <EnhancedHeader
        searchBarOptions={searchBarOptions}
        logoComponent={LogoComponent}
        withIcons
        notificationOnClick={action('click')}
        infoOnClick={action('click')}
        settingsOnClick={action('click')}
      />
    ),
    getSnippetTemplate(`
  <Header
    searchBarOptions={[
      'Search Result 1',
      'Search Result 2',
      'Search Result 3',
      'Search Result 4',
    ]}
    logoComponent={<Logo />}
    withIcons
    notificationOnClick={onClickHandler}
    infoOnClick={onClickHandler}
    settingsOnClick={onClickHandler}
  />
  `),
  )
  .add(
    'with text',
    () => (
      <EnhancedHeader
        searchBarOptions={searchBarOptions}
        logoComponent={LogoComponent}
        withText
        labelOne={getHeaderText()}
        labelTwo={getHeaderText()}
      />
    ),
    getSnippetTemplate(`
  <Header
    searchBarOptions={[
      'Search Result 1',
      'Search Result 2',
      'Search Result 3',
      'Search Result 4',
    ]}
    logoComponent={<Logo />}
    withText
    labelOne="Room 01"
    labelTwo="Room 01"
  />`),
  )
  .add(
    'with button',
    () => (
      <EnhancedHeader
        searchBarOptions={searchBarOptions}
        logoComponent={LogoComponent}
        withButton
        buttonIcon={buttonIcon}
        buttonLabel={getButtonLabel()}
        buttonOnClick={action('click')}
      />
    ),
    getSnippetTemplate(`
  <Header
    searchBarOptions={[
      'Search Result 1',
      'Search Result 2',
      'Search Result 3',
      'Search Result 4',
    ]}
    logoComponent={<Logo />}
    withButton
    buttonIcon="circleX"
    buttonLabel="Text"
    buttonOnClick={onClickHandler}
  />
    `),
  )
