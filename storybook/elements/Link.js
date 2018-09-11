import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
} from '../helpers'
import { default as EnhancedLink, Link } from '~/elements/Link'

const defaultText = 'Text'
const getDefaultProps = () => ({
  children: getTextKnob({ defaultText }),
  href: getTextKnob({ defaultText: 'https://merck.design' }),
})

storiesOf('Elements/Link', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Link))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedLink]),
    },
  })
  .add('default', () => <EnhancedLink {...getDefaultProps()} />)
