import React, {Fragment} from 'react'
import { configure, addDecorator } from '@storybook/react'

import { Theme } from 'liquid-design-react'

import COMPONENTS from './components.json'

function loadStories() {
  COMPONENTS.map(v => {
    require(`./components/${v}.js`)
  })
}

addDecorator(storyFn => (
  <Theme>
    <Fragment>
      <style>{`
        body {
          margin: 0;
        }
      `}</style>
      {storyFn()}
    </Fragment>
  </Theme>
))

configure(loadStories, module)
