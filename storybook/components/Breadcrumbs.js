import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import EnhancedBreadcrumbs, {
  Breadcrumbs,
} from '../../src/components/Breadcrumbs'
import {
  getBackgroundWrapper,
  getTextKnob,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'
import { times } from '../../src/utils/misc'

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

const getBreadcrumbsSnippet = props => `
  <Breadcrumbs
    items={[
      { content: 'Breadcrumb 1', onClick: onClickHandler },
      { content: 'Breadcrumb 2', onClick: onClickHandler },
      { content: 'Breadcrumb 3', onClick: onClickHandler },
    ]} ${props || ''}
  />
`

storiesOf('Components/Breadcrumbs', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Breadcrumbs))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        EnhancedBreadcrumbs,
        BreadcrumbsApp,
      ]),
    },
  })
  .add(
    'default',
    () => <EnhancedBreadcrumbs items={getItems()} />,
    getSnippetTemplate(getBreadcrumbsSnippet()),
  )
  .add(
    'active',
    () => <EnhancedBreadcrumbs items={getItems()} active={1} />,
    getSnippetTemplate(
      getBreadcrumbsSnippet(`
    active={1}`),
    ),
  )
  .add(
    'disabled',
    () => <EnhancedBreadcrumbs items={getItems({ disabled: true })} />,
    getSnippetTemplate(`
  <Breadcrumbs
    items={[
      { content: 'Breadcrumb 1', onClick: onClickHandler },
      { content: 'Breadcrumb 2', disabled: true },
      { content: 'Breadcrumb 3', onClick: onClickHandler },
    ]}
  />
`),
  )
  .add('interactive', () => <BreadcrumbsApp />)
