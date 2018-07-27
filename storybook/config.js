import React, { Fragment } from 'react'
import { configure, addDecorator } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import MODULES from './modules.json'
import ThemeWrapper from './ThemeWrapper'

configureActions()

function loadStories() {
  MODULES.map(({ name, type }) => {
    require(`./${type}s/${name}.js`)
  })
}

if (!process.env.STORYBOOK_LOKI_BUILD) {
  addDecorator(
    withInfo({
      inline: true,
      header: false,
      propTablesExclude: [Fragment],
    })
  )
} else {
  import('loki/configure-react')
}

addDecorator(storyFn => (
  <ThemeWrapper>
    <Fragment>
      <style>{`
        body {
          margin: 0;
        }
      `}</style>
      {storyFn()}
    </Fragment>
  </ThemeWrapper>
))

configure(loadStories, module)
