import { configure } from '@storybook/react'

function loadStories() {
  require('./components/Badge.js')
}

configure(loadStories, module)
