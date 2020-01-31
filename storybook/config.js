import 'babel-polyfill'
import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { setOptions } from '@storybook/addon-options'

import MODULES from './modules.json'
import ThemeWrapper from './ThemeWrapper'
import { Fragment, isStorybookLokiBuild } from './helpers'

const runStorybookConfig = async () => {
  configureActions()

  setOptions({
    name: 'Liquid Design System',
    url: '/',
  })

  function loadStories() {
    require('./introStory.js')
    MODULES.map(({ name, type, hasIndexFile }) => {
      require(`./${type}s/${hasIndexFile ? `${name}/index` : name}.js`)
    })
  }

  if (isStorybookLokiBuild()) {
    import('loki/configure-react') // eslint-disable-line
  } else {
    addDecorator(
      withInfo({
        inline: true,
        header: false,
        source: false,
      }),
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

  // eslint-disable-next-line
  if (Object.hasOwnProperty('assign')) {
    const { withKnobs } = await import('@storybook/addon-knobs')
    addDecorator(withKnobs)
  }

  configure(loadStories, module)
}

runStorybookConfig()
