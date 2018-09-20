import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  getTextKnob,
  getSnippetTemplate,
  getPropTablesExcludeList,
  includeComponentInPropTable,
} from '../helpers'
import { default as EnhancedRadioButton, RadioButton } from '~/elements/RadioButton'

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
  <RadioButton ${props || ``} label="Radio Button Label" value="radioOne" />
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
      propTablesExclude: getPropTablesExcludeList([EnhancedRadioButton, RadioButtonApp]),
    },
  })
  .add(
    'default',
    () => <EnhancedRadioButton {...getDefaultProps()} />,
    getSnippetTemplate(getRadioButtonSnippet('selected="radioTwo"'))
  )
  .add(
    'active',
    () => <EnhancedRadioButton {...getDefaultProps(true)} />,
    getSnippetTemplate(getRadioButtonSnippet('selected="radioOne"'))
  )
  .add(
    'disabled',
    () => <EnhancedRadioButton disabled {...getDefaultProps()} />,
    getSnippetTemplate(getRadioButtonSnippet('disabled'))
  )
  .add('stateful', () => <RadioButtonApp />)
