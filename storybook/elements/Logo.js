import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, getPropTablesExcludeList, getSnippetTemplate } from '../helpers'
import { default as EnhancedLogo, Logo } from '~/elements/Logo'

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
