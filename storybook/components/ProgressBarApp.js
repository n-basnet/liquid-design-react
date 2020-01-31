import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/** helper for *ProgressBar components' stories */
class ProgressBarApp extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.number,
    Component: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultValue: null,
  }

  state = {
    value: this.props.defaultValue || 50,
  }

  handleChange = ({ target }) =>
    this.setState({ value: parseInt(target.value) })

  render() {
    const { value } = this.state
    const { Component } = this.props
    return (
      <div>
        <Component value={value} {...this.props} />
        <br />
        <input
          type="range"
          min="0"
          max="200"
          value={value}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        />
      </div>
    )
  }
}

export default (Component, defaultProps = {}) => props => (
  <ProgressBarApp Component={Component} {...defaultProps} {...props} />
)
