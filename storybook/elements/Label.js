import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedLabel, Label } from '~/elements/Label'

const defaultText = 'Label Text'
const getDefaultProps = () => ({
  children: getTextKnob({ defaultText }),
})

const labelDescription = `\`Label\` component renders a \`<div>\` tag. It can be used with different components in the library like graphs, but not as HTML \`<label>\` element.`

storiesOf('Elements/Label', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Label))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedLabel]),
    },
  })
  .add(
    'default',
    () => <EnhancedLabel {...getDefaultProps()} />,
    getSnippetTemplate(
      `
  <Label>
    Label Text
  </Label>
  `,
      labelDescription
    )
  )
