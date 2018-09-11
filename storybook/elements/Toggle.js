import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
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

const sourceCodeInfo = {
  info: {
    text: `
      Toggles are used to select one out of two available options or to switch between two states.

      Usage:
      ~~~js
      class ToggleApp extends React.Component {
        state = {
          isActive: false,
        }
        toggle = () => this.setState(({ isActive }) => ({ isActive: !isActive }))
        render() {
          return (
            <Toggle
              isActive={this.state.isActive}
              onClick={this.toggle}
            />
          )
        }
      }
      ~~~
    `,
  },
}

storiesOf('Elements/Toggle', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Toggle))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([ToggleApp, EnhancedToggle]),
    },
  })
  .add('default', () => <ToggleApp />, sourceCodeInfo)
  .add('with icons', () => <ToggleApp toggleProps={{ icons: ['circleX', 'circleX'] }} />)
  .add('with icons disabled', () => (
    <ToggleApp toggleProps={{ icons: ['circleX', 'circleX'], disabled: true }} />
  ))
  .add('disabled', () => <EnhancedToggle disabled />)
