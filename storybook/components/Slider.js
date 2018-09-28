import React, { Component } from 'react'
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

class SliderApp extends Component {
  state = {
    value: 48,
  }

  updateValue = value => this.setState(prevState => ({ value }))

  render() {
    return <Slider value={this.state.value} withIcon onChange={this.updateValue} />
  }
}

const getSliderSnippet = props => `
  <Slider ${props || ``} label={getLabel()} onChange={action('onChange')} />
`

storiesOf('Components/Slider', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '330px' } }))
  .addParameters({
    info: {
      propTables: [Slider],
      propTablesExclude: getPropTablesExcludeList([SliderApp]),
    },
  })
  .add(
    'with label default',
    () => <Slider defaultValue={0} label={getLabel()} onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('defaultValue={0}'))
  )
  .add(
    'with label selected',
    () => <Slider defaultValue={48} label={getLabel()} onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('defaultValue={48} '))
  )
  .add(
    'with label disabled',
    () => <Slider defaultValue={0} disabled label={getLabel()} onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('defaultValue={0} disabled'))
  )
  .add(
    'without label default',
    () => <Slider defaultValue={0} withIcon onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('defaultValue={0} withIcon'))
  )
  .add(
    'without label selected',
    () => <Slider defaultValue={48} withIcon onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('defaultValue={48} withIcon'))
  )
  .add(
    'without label disabled',
    () => <Slider defaultValue={0} disabled withIcon onChange={action('onChange')} />,
    getSnippetTemplate(getSliderSnippet('defaultValue={0} disabled withIcon'))
  )
  .add('slider with provided external state', () => <SliderApp />, {
    info: {
      text: `
    Instead of using Slider's internal state, it is possible to provide an external state through the value prop. See the example below:

    ~~~js
    class SliderApp extends Component {
      state = {
        value: 48,
      }

      updateValue = value => this.setState(prevState => ({ value }))

      render() {
        return <Slider value={this.state.value} withIcon onChange={this.updateValue} />
      }
    }
    ~~~
  `,
    },
  })
