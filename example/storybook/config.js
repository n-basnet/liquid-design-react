import React, { Fragment } from 'react'
import { configure, addDecorator } from '@storybook/react'

import COMPONENTS from './components.json'

function loadStories() {
  COMPONENTS.map(v => {
    require(`./components/${v}.js`)
  })
}

addDecorator(storyFn => (
  <Fragment>
    <style>{`
      body {
        margin: 0;
      }
    `}</style>
    {storyFn()}
  </Fragment>
))

configure(loadStories, module)
