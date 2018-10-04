import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { without, append } from 'ramda'
import uniqid from 'uniqid'

import {
  getPropTablesExcludeList,
  includeComponentInPropTable,
  getBackgroundWrapper,
  getTextKnob,
} from '../helpers'
import { times } from '~/utils/aux'
import { default as EnhancedDropdown, Dropdown } from '~/elements/Dropdown'

const getOptions = (onClick, amount = 4) =>
  times(amount).map(v => ({
    name: getTextKnob({
      name: `option ${v + 1}`,
      defaultText: `Option ${v + 1}`,
    }),
    id: uniqid(),
    onClick,
  }))

const getDefaultProps = () => ({
  label: getTextKnob({ defaultText: 'Dropdown Label' }),
  options: getOptions(),
  onSubmit: action('submit'),
})

class MultiselectDropdown extends React.Component {
  state = {
    selectedOptionsIds: [],
    options: [],
  }
  componentDidMount() {
    this.setState({ options: getOptions(this.handleClick, 10) })
  }
  handleClick = ({ id }) => {
    const isSelected = this.state.selectedOptionsIds.indexOf(id) >= 0
    this[isSelected ? 'handleRemove' : 'handleAdd'](id)
  }
  updateSelectedOptionsIds = transformation =>
    this.setState(({ selectedOptionsIds }) => ({
      selectedOptionsIds: transformation(selectedOptionsIds),
    }))
  handleAdd = id => this.updateSelectedOptionsIds(append(id))
  handleRemove = id => this.updateSelectedOptionsIds(without([id]))
  render() {
    return (
      <EnhancedDropdown
        label={getTextKnob({ defaultText: 'Dropdown Label' })}
        options={this.state.options}
        selectedOptionsIds={this.state.selectedOptionsIds}
        onOptionDeselect={this.handleRemove}
        multiselect
        {...this.props}
      />
    )
  }
}

const getInfoMD = props => ({
  info: {
    text: `
  Dropdowns or select fields enable the user to select one option from a list of multiple options. The selection of an option can affect other form elements on the same page/screen.

  Usage:

  ~~~js ${`
  <Dropdown
    label='Dropdown label'
    options={[
      {name: 'Option 1', id: '1'},
      {name: 'Option 2', id: '2'},
    ]}${props || ''}
  >`}
  ~~~
`,
  },
})

storiesOf('Elements/Dropdown', module)
  .addDecorator(getBackgroundWrapper({ color: 'grey', style: { padding: '40px' } }))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([MultiselectDropdown, EnhancedDropdown]),
    },
  })
  .addDecorator(includeComponentInPropTable(Dropdown, { label: 'label' }))
  .add('default', () => <EnhancedDropdown {...getDefaultProps()} />, getInfoMD())
  .add(
    'active',
    () => {
      const props = getDefaultProps()
      return <EnhancedDropdown {...props} defaultValue={props.options[0]} />
    },
    getInfoMD(`
    defaultValue={OPTIONS[0]}`)
  )
  .add(
    'disabled',
    () => <EnhancedDropdown {...getDefaultProps()} disabled />,
    getInfoMD(`
    disabled`)
  )
  .add(
    'inline',
    () => <EnhancedDropdown {...getDefaultProps()} inline />,
    getInfoMD(`
    inline`)
  )
  .add(
    'inline active',
    () => {
      const props = getDefaultProps()
      return <EnhancedDropdown {...props} inline defaultValue={props.options[0]} />
    },
    getInfoMD(`
    inline
    defaultValue={OPTIONS[0]}`)
  )
  .add(
    'inline disabled',
    () => <EnhancedDropdown {...getDefaultProps()} inline disabled />,
    getInfoMD(`
    inline disabled`)
  )
  .add(
    'multiselect',
    () => <MultiselectDropdown />,
    getInfoMD(`
    multiselect
    selectedOptionsIds={['1']}`)
  )
  .add(
    'multiselect inline',
    () => <MultiselectDropdown inline />,
    getInfoMD(`
    multiselect
    inline
    selectedOptionsIds={['1']}`)
  )
  .add(
    'multiselect disabled',
    () => <MultiselectDropdown disabled />,
    getInfoMD(`
    multiselect
    selectedOptionsIds={['1']}`)
  )
