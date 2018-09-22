import React, { Component } from 'react'

import { ContentCard, Theme } from '@liquid-design/liquid-design-react'

class App extends Component {
  render() {
    return (
      <Theme>
        <ContentCard title='Hello World' />
      </Theme>
    )
  }
}

export default App
