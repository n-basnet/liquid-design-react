import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Breadcrumbs } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'
import { times } from '~/utils/aux'

const getItems = (modifier = {}) => [
  {
    name: getTextKnob({ defaultText: 'Breadcrumb 1', name: 'item 1' }),
    onClick: action('click breadcrumb 1'),
  },
  {
    name: getTextKnob({ defaultText: 'Breadcrumb 2', name: 'item 2' }),
    ...(!modifier.disabled && { onClick: action('click breadcrumb 2') }),
    ...modifier,
  },
  {
    name: getTextKnob({ defaultText: 'Breadcrumb 3', name: 'item 3' }),
    onClick: action('click breadcrumb 3'),
  },
]

const getItemsForInteractive = onClick =>
  times(3).map(v => ({
    name: `Breadcrumb ${v + 1}`,
    onClick: () => onClick(v),
  }))

class BreadcrumbsApp extends PureComponent {
  state = { active: null }
  setActive = active => {
    this.setState({ active })
  }
  render() {
    return (
      <Breadcrumbs
        items={getItemsForInteractive(this.setActive)}
        active={this.state.active}
      />
    )
  }
}

storiesOf('Components/Breadcrumbs', module)
  .addDecorator(getBackgroundWrapper())
  .add('default', () => <Breadcrumbs items={getItems()} />)
  .add('active', () => <Breadcrumbs items={getItems()} active={1} />)
  .add('disabled', () => <Breadcrumbs items={getItems({ disabled: true })} />)
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [BreadcrumbsApp],
    },
  })
  .add('interactive', () => <BreadcrumbsApp />)
