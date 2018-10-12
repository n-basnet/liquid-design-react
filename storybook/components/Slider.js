import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Slider } from '~'
import {
  getBackgroundWrapper,
  getTextKnob,
  getSnippetTemplate,
  getPropTablesExcludeList,
} from '../helpers.js'

const getLabel = () =>
  getTextKnob({
    name: 'label',
    defaultText: 'Slider label',
  })

const getSliderSnippet = props => `
  <Slider ${props || ``} />
`

const params = {
  info: {
    propTables: [Slider],
    propTablesExclude: getPropTablesExcludeList([]),
    excludedPropTypes: ['className'],
  },
}

storiesOf('Components/Slider/with buttons', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '330px' } }))
  .addParameters(params)
  .add(
    'default',
    () => <Slider withButtons onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('withButtons'))
  )
  .add(
    'with default value',
    () => <Slider defaultValue={48} withButtons onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('defaultValue={48} withButtons'))
  )
  .add(
    'disabled',
    () => <Slider disabled withButtons onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('disabled withButtons'))
  )

storiesOf('Components/Slider/with label', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '330px' } }))
  .addParameters(params)
  .add(
    'default',
    () => <Slider defaultValue={0} label={getLabel()} onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet("label='Slider label'"))
  )
  .add(
    'with default value',
    () => <Slider defaultValue={48} label={getLabel()} onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet("defaultValue={48} label='Slider label'"))
  )
  .add(
    'disabled',
    () => <Slider defaultValue={0} disabled label={getLabel()} onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet("label='Slider label' disabled"))
  )
