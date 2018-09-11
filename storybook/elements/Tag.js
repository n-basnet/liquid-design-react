import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { default as EnhancedTag, Tag } from '~/elements/Tag'

const defaultProps = { label: 'Tag Label' }

storiesOf('Elements/Tag', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Tag, defaultProps))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedTag]),
    },
  })
  .add('solid', () => <EnhancedTag {...defaultProps} />)
  .add('solid disabled', () => <EnhancedTag disabled {...defaultProps} />)
  .add('outline', () => <EnhancedTag {...defaultProps} outline />)
  .add('outline disabled', () => <EnhancedTag disabled {...defaultProps} outline />)
