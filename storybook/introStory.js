import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import { getBackgroundWrapper, getPropTablesExcludeList } from './helpers'
import { getClassName } from '~/components/aux/hoc/attachClassName'
import { GLOBAL_CSS_PREFIX } from '~/utils/consts'

const Heading = styled.h1`
  margin: 0;
`

const BADGE_CLASS_NAME = getClassName({ name: 'Badge' })

storiesOf('Intro', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([Heading]),
    },
  })
  .addDecorator(storyFn => (
    <Fragment>
      <style>{`
      #storybook-theme-wrapper {
        display: none;
      }
    `}</style>
      {storyFn()}
    </Fragment>
  ))
  .add('About', () => (
    <Fragment>
      <Heading>liquid-design-react</Heading>
      <div>
        Liquid Design System components for React. Design System and Component Kit to create
        beautifull applications.
      </div>
    </Fragment>
  ))
  .add('Quick Start', () => <Heading>Quick Start</Heading>, {
    info: {
      text: `
  Install the package via npm:

  ~~~~bash
  $ npm i liquid-design-react
  ~~~~

  Then, wrap the root of your application with the \`Theme\` component to provide typographic defaults and global styles.

  ~~~js
  import React, { Component } from 'react'

  import { Badge, Theme } from 'liquid-design-react'

  class Example extends Component {
    render() {
      return (
        <Theme>
          <Badge text='Hello' />
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

    #### via \`style\` prop:

    ~~~~js
    <Badge text='Hello' style={{width: '500px'}} />
    ~~~~

    #### via CSS:

    every component has a \`className\` that is the component's name prefixed with \`${GLOBAL_CSS_PREFIX}\` (i.e. \`${BADGE_CLASS_NAME}\`):

    ~~~~js
    <style>{\`
      .${BADGE_CLASS_NAME} {
        width: 500px;
      }
    \`}</style>
    <Badge text='Hello' />
    ~~~~

    ## Custom props

    All additional props will be passed to the component, i.e:

    ~~~~js
    <Badge text='Hello' onClick={clickHandler} />
    ~~~~

    will attach the click handler to \`Badge\` component, and:

    ~~~~js
    <Badge text='Hello' data-test-id={42} />
    ~~~~

    will render the \`data-test-id\` attribute to the DOM element rendered by \`Badge\`.
    `,
    },
  })
