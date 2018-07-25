import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { getBackgroundWrapper } from '../helpers'
import { Checkbox } from '~'

const label = 'Checkbox text'

class CheckboxApp extends React.Component {
  state = {
    isChecked: false,
  }
  toggle = () => {
    const isChecked = !this.state.isChecked
    this.setState({ isChecked })
    action('change state')(isChecked)
  }
  render() {
    return (
      <div>
        <Checkbox isChecked={this.state.isChecked} label={label} />
        <br />
        <input
          type='checkbox'
          onChange={this.toggle}
          checked={this.state.isChecked}
        />
        {'<- control the checkbox'}
      </div>
    )
  }
}

storiesOf('Elements/Checkbox', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => (
    <Checkbox label={label} onChange={action('checkbox click')} />
  ))
  .add('disabled', () => (
    <Checkbox disabled label={label} onChange={action('checkbox click')} />
  ))
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [CheckboxApp],
    },
  })
  .add('controlled externally', () => <CheckboxApp />, {
    info: {
      text: `
    ~~~js
    class CheckboxApp extends React.Component {
      state = {
        isChecked: false,
      }
      toggle = () => {
        const isChecked = !this.state.isChecked
        this.setState({ isChecked })
        action('change state')(isChecked)
      }
      render() {
        return (
          <div>
            <Checkbox isChecked={this.state.isChecked} label={label} />
            <br />
            <input
              type='checkbox'
              onChange={this.toggle}
              checked={this.state.isChecked}
            />
            {'<- control the checkbox'}
          </div>
        )
      }
    }    ~~~
  `,
    },
  })
