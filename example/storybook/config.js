import React, {Fragment} from 'react'
import { configure, addDecorator } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'

import { Theme } from 'liquid-design-react'

configureActions()

import MODULES from './modules.json'

function loadStories() {
  MODULES.map(({name, type}) => {
    require(`./${type}s/${name}.js`)
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
