import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import {
  default as EnhancedLinearProgressBar,
  LinearProgressBar,
} from '~/components/LinearProgressBar'

class LinearProgressBarApp extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.number,
  }
  static defaultProps = {
    defaultValue: null,
  }
  state = {
    value: this.props.defaultValue || 50,
  }
  handleChange = ({ target }) => this.setState({ value: parseInt(target.value) })
  render() {
    const { value } = this.state
    return (
      <Fragment>
        <EnhancedLinearProgressBar value={value} {...this.props} />
        <br />
        <input
          type='range'
          min='0'
          max='210'
          value={value}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        />
      </Fragment>
    )
  }
}

const getSnippet = (propsString = '', value = 50) =>
  getSnippetTemplate(`
    <LinearProgressBar
      value={${value}}${propsString}
    />
  `)

storiesOf('Components/LinearProgressBar', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(LinearProgressBar))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        EnhancedLinearProgressBar,
        LinearProgressBarApp,
      ]),
    },
  })
  .add('default', () => <LinearProgressBarApp />, getSnippet())
  .add(
    'using theme colors',
    () => <LinearProgressBarApp useThemeColors />,
    getSnippet(`
      useThemeColors`)
  )
  .add('overdue', () => <LinearProgressBarApp defaultValue={150} />, getSnippet(undefined, 120))
  .add(
    'disabled',
    () => <LinearProgressBarApp disabled />,
    getSnippet(`
      disabled`)
  )
