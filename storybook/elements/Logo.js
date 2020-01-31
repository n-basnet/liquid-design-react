import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import EnhancedLogo, { Logo } from '../../src/elements/Logo'

const logoSnippet = `
  <Logo />
`

storiesOf('Elements/Logo', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTables: [Logo],
      propTablesExclude: getPropTablesExcludeList([EnhancedLogo]),
    },
  })
  .add('default', () => <EnhancedLogo />, getSnippetTemplate(logoSnippet))
