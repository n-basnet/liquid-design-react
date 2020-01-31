import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import { getBackgroundWrapper, getPropTablesExcludeList } from './helpers'
import { getClassName } from '../src/components/misc/hoc/attachClassName'
import { GLOBAL_CSS_PREFIX } from '../src/utils/consts'
import { THEMES, DEFAULT_THEME_NAME } from '../src/utils/consts/themes'

const Heading = styled.h1`
  margin: 0;
`

const themeList = Object.keys(THEMES)

const BADGE_CLASS_NAME = getClassName({ name: 'Badge' })

storiesOf('Intro', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([Heading]),
    },
  })
  .addDecorator(storyFn => (
    <div>
      <style>{`
      #storybook-theme-wrapper {
        display: none;
      }
    `}</style>
      {storyFn()}
    </div>
  ))
  .add('About', () => (
    <div>
      <Heading>liquid-design-react</Heading>
      <div>
        Liquid Design System components for React. Design System and Component
        Kit to create beautiful applications.
      </div>
    </div>
  ))
  .add('Quick Start', () => <Heading>Quick Start</Heading>, {
    info: {
      text: `
  Install the package via npm:

  ~~~~bash
  $ npm i @liquid-design/liquid-design-react
  ~~~~

  Then, wrap the root of your application with the \`Theme\` component to provide typographic defaults and global styles.

  ~~~js
  import React, { Component } from 'react'

  import { Badge, Theme } from '@liquid-design/liquid-design-react'

  class Example extends Component {
    render() {
      return (
        <Theme>
          <Badge>Hello</Badge>
        </Theme>
      )
    }
  }
  ~~~
`,
    },
  })
  .add('Customisation', () => <Heading>Customisation</Heading>, {
    info: {
      text: `
    ## Styling

    The components' styles can be customised via props or CSS:

    #### via \`className\` prop:

    every component accepts \`className\` prop to add custom classes.

    ~~~~js
    <Badge className='new-class'>
      Hello
    </Badge>
    ~~~~

    #### via \`style\` prop:

    ~~~~js
    <Badge style={{width: '500px'}}>
      Hello
    </Badge>
    ~~~~

    #### via CSS:

    every component has a \`className\` that is the component's name prefixed with \`${GLOBAL_CSS_PREFIX}\` (i.e. \`${BADGE_CLASS_NAME}\`):

    ~~~~js
    <style>{\`
      .${BADGE_CLASS_NAME} {
        width: 500px;
      }
    \`}</style>
    <Badge>Hello</Badge>
    ~~~~

    ## Custom props

    All additional props will be passed to the component, i.e:

    ~~~~js
    <Badge onClick={clickHandler}>
      Hello
    </Badge>
    ~~~~

    will attach the click handler to \`Badge\` component.

    ~~~~js
    <Badge data-test-id={42}>
      Hello
    </Badge>
    ~~~~

    will render the \`data-test-id\` attribute to the DOM element rendered by \`Badge\`.

    ##  Theming

    Theme wrapper has \`themeName\` prop in which you can pass one of themes to use with the library. \n
    Themes list: \`${themeList.map(theme => ` ${theme}`)}\` \n
    The default theme is \`${DEFAULT_THEME_NAME}\` \n

    ~~~~js
    <Theme themeName='${DEFAULT_THEME_NAME}'>
      <Badge>Hello</Badge>
    </Theme>
    ~~~~

    If you want to use your custom theme or to change some params in one of themes provided by library you can pass \`customTheme\` prop to Theme wrapper.
    \`customTheme\` should be an object with a specific shape which will be merged with default theme or theme selected by providing \`themeName\` prop.
    It can contain either all or only some of the following fields:

    ~~~~js
    const customThemeObj = {
      colors: {                         // overrides theme colors
        primary: {                      // overrides primary theme colors
          base: '#6767EF',
          lightest: '#A5A5E6',
          dark: '#22226D',
          darker: '#3737A2',
        },
        secondary: {                    // overrides secondary theme colors
          base: '#31F3CF',
          lightest: '#D4F5EF',
          dark: '#03FFD1',
        },
        richBlack: {                      // overrides one of additional theme colors
          base: '#5B5B79',
        }
      },
      borderRadius: '3px',              // overrides theme borderRadius value
      fontFamily: "'Lato', sans-serif", // overrides theme fontFamily value
      fontSize: {                       // overrides font size values for various headline components
        xh1: '92px',
        xh2: '72px',
        xh3: '64px',
        xh4: '48px',
        xh5: '40px',
        xh6: '36px',
        h1: '32px',
        h2: '26px',
        h3: '22px',
        h4: '18px',
        h5: '16px',
        h6: '14px',
        bh1: '48px',
        bh2: '40px',
        bh3: '36px',
        bh4: '32px',
        bh5: '26px',
        bh6: '22px',
      },
      fontWeight: {                     // overrides theme font-weight values
        regular: '400',
        bold: '700',
        black: '900',
      },
      transition: 'all 200ms',         // overrides theme transition value
      boxShadow: '0 0 0 #000000',         // overrides for various box-shadow values
      doubleBoxShadowSmall: '0 0 0 #000',
      doubleBoxShadowSmallHover: '0 0 0 #000',
      doubleBoxShadow: '0 0 0 #000',
      zIndex: {                       //overrides for z-index values
        tooltips: 9,
      },
    }

    <Theme customTheme={customThemeObj}>
      <Badge>Hello</Badge>
    </Theme>
    ~~~~
    `,
    },
  })
