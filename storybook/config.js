import React, { Fragment } from 'react'
import { configure, addDecorator } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import { Theme } from '~'
import MODULES from './modules.json'

configureActions()

function loadStories() {
  MODULES.map(({ name, type }) => {
    require(`./${type}s/${name}.js`)
  })
}

addDecorator(withInfo({
  inline: true,
  header: false,
  propTablesExclude: [
    Fragment,
  ],
}))

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
