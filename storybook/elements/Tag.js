import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
  getTextKnob,
} from '../helpers'
import { default as EnhancedTag, Tag } from '~/elements/Tag'

const getDefaultProps = () => ({ label: getTextKnob({ defaultText: 'Tag Label' }) })

const getToggleSnippet = props => `
  <Tag label="Tag Label" ${props || ``}/>
`

storiesOf('Elements/Tag', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Tag, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedTag]),
    },
  })
  .add(
    'solid',
    () => <EnhancedTag {...getDefaultProps()} />,
    getSnippetTemplate(getToggleSnippet())
  )
  .add(
    'solid disabled',
    () => <EnhancedTag disabled {...getDefaultProps()} />,
    getSnippetTemplate(getToggleSnippet('disabled '))
  )
  .add(
    'outline',
    () => <EnhancedTag {...getDefaultProps()} outline />,
    getSnippetTemplate(getToggleSnippet('outline '))
  )
  .add(
    'outline disabled',
    () => <EnhancedTag disabled {...getDefaultProps()} outline />,
    getSnippetTemplate(getToggleSnippet('outline disabled '))
  )
