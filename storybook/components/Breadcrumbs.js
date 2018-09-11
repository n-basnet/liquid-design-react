import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { default as EnhancedBreadcrumbs, Breadcrumbs } from '~/components/Breadcrumbs'
import {
  getBackgroundWrapper,
  getTextKnob,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { times } from '~/utils/aux'

const getItems = (modifier = {}) => [
  {
    content: getTextKnob({ defaultText: 'Breadcrumb 1', name: 'item 1' }),
    onClick: action('click breadcrumb 1'),
  },
  {
    content: getTextKnob({ defaultText: 'Breadcrumb 2', name: 'item 2' }),
    ...(!modifier.disabled && { onClick: action('click breadcrumb 2') }),
    ...modifier,
  },
  {
    content: getTextKnob({ defaultText: 'Breadcrumb 3', name: 'item 3' }),
    onClick: action('click breadcrumb 3'),
  },
]

const getItemsForInteractive = onClick =>
  times(3).map(v => ({
    content: `Breadcrumb ${v + 1}`,
    onClick: () => onClick(v),
  }))

class BreadcrumbsApp extends PureComponent {
  state = { active: null }
  setActive = active => {
    this.setState({ active })
  }
  render() {
    return (
      <EnhancedBreadcrumbs
        items={getItemsForInteractive(this.setActive)}
        active={this.state.active}
      />
    )
  }
}

storiesOf('Components/Breadcrumbs', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Breadcrumbs))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedBreadcrumbs, BreadcrumbsApp]),
    },
  })
  .add('default', () => <EnhancedBreadcrumbs items={getItems()} />)
  .add('active', () => <EnhancedBreadcrumbs items={getItems()} active={1} />)
  .add('disabled', () => <EnhancedBreadcrumbs items={getItems({ disabled: true })} />)
  .add('interactive', () => <BreadcrumbsApp />)
