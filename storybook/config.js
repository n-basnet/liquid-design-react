import React, { Fragment } from 'react'
import { configure, addDecorator } from '@storybook/react'
import 'loki/configure-react'
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

if (!process.env.STORYBOOK_HIDE_INFO) {
  addDecorator(
    withInfo({
      inline: true,
      header: false,
      propTablesExclude: [Fragment],
    })
  )
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
