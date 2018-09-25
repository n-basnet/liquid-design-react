import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Slider } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers.js'

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

storiesOf('Components/Slider', module)
  .addDecorator(getBackgroundWrapper({ style: { maxWidth: '330px' } }))
  .add('with label default', () => (
    <Slider defaultValue={0} label={getLabel()} onChange={action('onChange')} />
  ))
  .add('with label selected', () => (
    <Slider defaultValue={48} label={getLabel()} onChange={action('onChange')} />
  ))
  .add('with label disabled', () => (
    <Slider defaultValue={0} disabled label={getLabel()} onChange={action('onChange')} />
  ))
  .add('without label default', () => (
    <Slider defaultValue={0} withIcon onChange={action('onChange')} />
  ))
  .add('without label selected', () => (
    <Slider defaultValue={48} withIcon onChange={action('onChange')} />
  ))
  .add('without label disabled', () => (
    <Slider defaultValue={0} disabled withIcon onChange={action('onChange')} />
  ))
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
