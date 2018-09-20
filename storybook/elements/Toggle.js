import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import { default as EnhancedToggle, Toggle } from '~/elements/Toggle'

class ToggleApp extends React.Component {
  static propTypes = {
    toggleProps: PropTypes.object,
  }
  static defaultProps = {
    toggleProps: {},
  }
  state = {
    isActive: false,
  }
  toggle = () => this.setState(({ isActive }) => ({ isActive: !isActive }))
  render() {
    const { toggleProps } = this.props
    return <EnhancedToggle isActive={this.state.isActive} onClick={this.toggle} {...toggleProps} />
  }
}

const toggleSnippet = {
  description: `
  Toggles are used to select one out of two available options or to switch between two states.

  Usage:`,
  getSnippet: props => `
  class ToggleApp extends React.Component {
    state = {
      isActive: false,
    }
    toggle = () => this.setState(({ isActive }) => ({ isActive: !isActive }))
    render() {
      return (
        <Toggle
          isActive={this.state.isActive}
          onClick={onClickHandler}${props || ``}
        />
      )
    }
  }`,
}

storiesOf('Elements/Toggle', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Toggle))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([ToggleApp, EnhancedToggle]),
    },
  })
  .add(
    'default',
    () => <ToggleApp />,
    getSnippetTemplate(toggleSnippet.getSnippet(), toggleSnippet.description)
  )
  .add(
    'with icons',
    () => <ToggleApp toggleProps={{ icons: ['circleX', 'circleX'] }} />,
    getSnippetTemplate(
      toggleSnippet.getSnippet(`
          icons={['circleX', 'circleX']}`),
      toggleSnippet.description
    )
  )
  .add(
    'with icons disabled',
    () => <ToggleApp toggleProps={{ icons: ['circleX', 'circleX'], disabled: true }} />,
    getSnippetTemplate(
      toggleSnippet.getSnippet(`
          icons={['circleX', 'circleX']}
          disabled`),
      toggleSnippet.description
    )
  )
  .add(
    'disabled',
    () => <EnhancedToggle disabled />,
    getSnippetTemplate(
      toggleSnippet.getSnippet(`
          disabled`),
      toggleSnippet.description
    )
  )
