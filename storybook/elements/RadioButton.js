import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedRadioButton, RadioButton } from '~/elements/RadioButton'
import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
} from '../helpers'

const defaultText = 'Radio Button Label'
const VALUES = ['radioOne', 'radioTwo']

class RadioButtonApp extends PureComponent {
  state = {
    selectedValue: VALUES[0],
  }

  getSelectHandler = selectedValue => () => {
    this.setState({ selectedValue })
  }

  render() {
    const { selectedValue } = this.state

    return (
      <div>
        {VALUES.map(value => (
          <EnhancedRadioButton
            key={value}
            isSelected={selectedValue === value}
            onClick={this.getSelectHandler(value)}
            label={getTextKnob({ defaultText, name: `label for ${value}` })}
            style={{ display: 'block' }}
          />
        ))}
      </div>
    )
  }
}

const getDefaultProps = isSelected => ({
  label: getTextKnob({ defaultText }),
  isSelected,
})

storiesOf('Elements/Radio Button', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(RadioButton, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedRadioButton, RadioButtonApp]),
    },
  })
  .add('default', () => <EnhancedRadioButton {...getDefaultProps()} />)
  .add('active', () => <EnhancedRadioButton {...getDefaultProps(true)} />)
  .add('disabled', () => <EnhancedRadioButton disabled {...getDefaultProps()} />)
  .add('stateful', () => <RadioButtonApp />)
