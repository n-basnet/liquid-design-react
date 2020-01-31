import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'
import EnhancedLink, { Link } from '../../src/elements/Link'

const defaultText = 'Text'
const getDefaultProps = () => ({
  children: getTextKnob({ defaultText }),
  href: getTextKnob({ defaultText: 'https://merck.design' }),
})

storiesOf('Elements/Link', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedLink]),
      propTables: [Link],
    },
  })
  .add(
    'default',
    () => <EnhancedLink {...getDefaultProps()} />,
    getSnippetTemplate(`
  <Link>
    Text
  </Link>
  `),
  )
