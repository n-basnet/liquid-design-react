import 'babel-polyfill'
import React, { Fragment } from 'react'
import { configure, addDecorator } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import MODULES from './modules.json'
import ThemeWrapper from './ThemeWrapper'

const runStorybookConfig = async () => {
  configureActions()

  function loadStories() {
    MODULES.map(({ name, type }) => {
      require(`./${type}s/${name}.js`)
    })
  }

  if (process.env.STORYBOOK_LOKI_BUILD) {
    import('loki/configure-react')
  } else {
    addDecorator(
      withInfo({
        inline: true,
        header: false,
        source: false,
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

  if (Object.hasOwnProperty('assign')) {
    const { withKnobs } = await import('@storybook/addon-knobs')
    addDecorator(withKnobs)
  }

  configure(loadStories, module)
}

runStorybookConfig()
