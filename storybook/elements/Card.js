import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  includeComponentInPropTable,
  getSnippetTemplate,
} from '../helpers'
import EnhancedCard, { Card } from '../../src/elements/Card'

class CardApp extends PureComponent {
  state = {
    isCardActive: false,
  }

  toggleCardActive = () => {
    this.setState(({ isCardActive }) => ({ isCardActive: !isCardActive }))
  }

  render() {
    const { isCardActive } = this.state

    return (
      <EnhancedCard
        active={isCardActive}
        onClick={this.toggleCardActive}
        {...this.props}
      >
        {getTextKnob()}
      </EnhancedCard>
    )
  }
}

const getCardSnippet = props => `
  <Card${props || ''}>
    lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel
  </Card>
`
const getCardAppSnippet = props => `
  class CardApp extends PureComponent {
    state = {
      isCardActive: false
    }
    toggleCardActive = () => {
      this.setState(({isCardActive}) => ({isCardActive: !isCardActive}))
    }
    render () {
      const { isCardActive } = this.state

      return (
        <Card
          active={isCardActive}
          onClick={this.toggleCardActive}
          ${props || ''}
        >
        lorem ipsum dolor sit amet, consectetur adipiscing...
        </Card>
      )
    }
  }
`

storiesOf('Elements/Card', module)
  .addDecorator(getBackgroundWrapper({ color: 'dark' }))
  .addDecorator(includeComponentInPropTable(Card, { children: '' }))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedCard, CardApp]),
    },
  })
  .add('default', () => <CardApp />, getSnippetTemplate(getCardAppSnippet()))
  .add(
    'stacked',
    () => <CardApp stacked />,
    getSnippetTemplate(getCardAppSnippet(' stacked')),
  )

  .add(
    'active',
    () => <EnhancedCard active>{getTextKnob()}</EnhancedCard>,
    getSnippetTemplate(getCardSnippet(' active')),
  )
