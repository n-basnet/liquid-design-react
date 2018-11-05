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

const getSliderSnippet = props => `
  <Slider ${props || ``} />
`
const getSliderAppSnipepet = props => `
  class SliderApp extends Component {
    state = {
      value: 50
    }

    onChangeHandler = (value) => this.setState({value})

    render() {
      return (
        <Slider
          withButtons
          value={this.state.value}
          onChange={this.onChangeHandler}
        />
      )
    }
  }
`

class SliderApp extends Component {
  state = {
    value: 50,
  }

  onChangeHandler = value => this.setState({ value })

  render() {
    return <Slider withButtons value={this.state.value} onChange={this.onChangeHandler} />
  }
}

const params = {
  info: {
    propTables: [Slider],
    propTablesExclude: getPropTablesExcludeList([SliderApp]),
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
  .add(
    'with provided external state',
    () => <SliderApp />,
    getSnippetTemplate(getSliderAppSnipepet())
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
