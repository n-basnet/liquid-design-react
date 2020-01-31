import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  getTextKnob,
  getSnippetTemplate,
  getPropTablesExcludeList,
  includeComponentInPropTable,
} from '../helpers'
import EnhancedRadioButton, {
  RadioButton,
} from '../../src/elements/RadioButton'

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

const getRadioButtonSnippet = props => `
  <RadioButton ${props ? `${props} ` : ''}label="Radio Button Label" />
`

const getDefaultProps = isSelected => ({
  label: getTextKnob({ defaultText }),
  isSelected,
})

storiesOf('Elements/Radio Button', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(RadioButton, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        EnhancedRadioButton,
        RadioButtonApp,
      ]),
    },
  })
  .add(
    'default',
    () => <EnhancedRadioButton {...getDefaultProps()} />,
    getSnippetTemplate(getRadioButtonSnippet()),
  )
  .add(
    'active',
    () => <EnhancedRadioButton {...getDefaultProps(true)} />,
    getSnippetTemplate(getRadioButtonSnippet('isSelected')),
  )
  .add(
    'disabled',
    () => <EnhancedRadioButton disabled {...getDefaultProps()} />,
    getSnippetTemplate(getRadioButtonSnippet('disabled')),
  )
  .add(
    'stateful',
    () => <RadioButtonApp />,
    getSnippetTemplate(`
  class RadioButtonApp extends PureComponent {
    state = {
      selectedValue: 0,
    }
    getSelectHandler = selectedValue => () => this.setState({ selectedValue })
    render() {
      return (
        <div>
          {[0, 1].map(value => (
            <RadioButton
              key={value}
              isSelected={this.state.selectedValue === value}
              onClick={this.getSelectHandler(value)}
              label='Radio Button Label'
            />
          ))}
        </div>
      )
    }
  }
    `),
  )
