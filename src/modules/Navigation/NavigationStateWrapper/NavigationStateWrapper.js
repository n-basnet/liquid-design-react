import React from 'react'
import { func, number } from 'prop-types'

// This is an example how we can create logic for Navigation component
// This FACC component handles active tab state
export class NavigationStateWrapper extends React.Component {
  state = {
    activeTabIndex: null,
  }

  componentDidMount() {
    const { activeTabIndex } = this.props
    this.setState({ activeTabIndex })
  }

  handleTabClick = index => this.setState({ activeTabIndex: index })

  render() {
    const { activeTabIndex } = this.state
    const { handleTabClick } = this

    return this.props.children({
      activeTabIndex,
      handleTabClick,
    })
  }
}

NavigationStateWrapper.propTypes = {
  activeTabIndex: number,
  children: func.isRequired,
}

NavigationStateWrapper.defaultProps = {
  activeTabIndex: null,
}

export default NavigationStateWrapper
