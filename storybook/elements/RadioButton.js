import React, { Component, Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import { RadioButton } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const defaultText = 'Radio Button Label'

class RadioButtonApp extends Component {
  state = {
    selected: 'radioOne',
  }

  selectRadio = event => {
    this.setState({ selected: event.target.value })
  }

  render() {
    const { selected } = this.state

    return (
      <Fragment>
        <RadioButton
          selected={selected}
          label={getTextKnob({ defaultText })}
          value='radioOne'
          onClick={this.selectRadio}
        />
        <br />
        <RadioButton
          selected={selected}
          label={getTextKnob({ defaultText })}
          value='radioTwo'
          onClick={this.selectRadio}
        />
      </Fragment>
    )
  }
}

storiesOf('Elements/Radio Button', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => (
    <RadioButton selected='radioTwo' label={getTextKnob({ defaultText })} value='radioOne' />
  ))
  .add('active', () => (
    <RadioButton selected='radioOne' label={getTextKnob({ defaultText })} value='radioOne' />
  ))
  .add('disabled', () => <RadioButton disabled label={getTextKnob({ defaultText })} />)
  .add('stateful', () => <RadioButtonApp />)
