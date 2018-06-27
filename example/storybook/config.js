import { configure } from '@storybook/react'

import COMPONENTS from './components.json'

function loadStories() {
  COMPONENTS.map(v => {
    require(`./components/${v}.js`)
  })
}

configure(loadStories, module)
