import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Breadcrumbs } from '~'
import { getBackgroundWrapper } from '../helpers'
import { times } from '~/utils/aux'

const getItems = (modifier = {}) => [
  {
    name: 'Breadcrumb 1',
    onClick: action('click breadcrumb 1'),
  },
  {
    name: 'Breadcrumb 2',
    ...(!modifier.disabled && { onClick: action('click breadcrumb 2') }),
    ...modifier,
  },
  {
    name: 'Breadcrumb 3',
    onClick: action('click breadcrumb 3'),
  },
]

const getItemsForInteractive = onClick =>
  times(3).map(v => ({
    name: `Breadcrumb ${v + 1}`,
    onClick: () => onClick(v),
  }))

class BreadcrumbsApp extends React.Component {
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
