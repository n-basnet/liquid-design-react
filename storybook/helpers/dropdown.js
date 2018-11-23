import React from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'
import { without, append } from 'ramda'
import uniqid from 'uniqid'

import { times } from '~/utils/aux'
import { getTextKnob } from '.'

export const getDropdownOptions = (onClick, amount = 4) =>
  times(amount).map(v => ({
    name: getTextKnob({
      name: `option ${v + 1}`,
      defaultText: `Option ${v + 1}`,
    }),
    id: uniqid(),
    onClick,
  }))

export const getDefaultDropdownProps = ({ defaultText }) => ({
  label: getTextKnob({ defaultText }),
  options: getDropdownOptions(),
  onSubmit: action('submit'),
})

export class MultiselectDropdownStateWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  state = {
    selectedOptionsIds: [],
    options: [],
  }
  componentDidMount() {
    this.setState({ options: getDropdownOptions(this.handleClick, 10) })
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
    const { children } = this.props
    const { options, selectedOptionsIds } = this.state

    if (!children) {
      return null
    }

    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          options,
          selectedOptionsIds,
          onOptionDeselect: this.handleRemove,
        })
      }
    })
  }
}
