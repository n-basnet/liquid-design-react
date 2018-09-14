import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
} from '../helpers'
import { default as EnhancedTag, Tag } from '~/elements/Tag'

const getDefaultProps = () => ({ label: getTextKnob({ defaultText: 'Tag Label' }) })

storiesOf('Elements/Tag', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Tag, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedTag]),
    },
  })
  .add('solid', () => <EnhancedTag {...getDefaultProps()} />)
  .add('solid disabled', () => <EnhancedTag disabled {...getDefaultProps()} />)
  .add('outline', () => <EnhancedTag {...getDefaultProps()} outline />)
  .add('outline disabled', () => <EnhancedTag disabled {...getDefaultProps()} outline />)
