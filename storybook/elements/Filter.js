import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTablesExcludeList, getBackgroundWrapper } from '../helpers'
import { getDefaultDropdownProps, MultiselectDropdownStateWrapper } from '../helpers/dropdown'
import Filter from '~/elements/Filter'
import { DropdownProvider } from '~/elements/aux/DropdownProvider'

const getInfoMD = props => ({
  info: {
    text: `
  Filters are used to organize a set of available content by categories. They should always be used close to their content. Filters can be added and removed in order to decrease or increase the amount of visible content.

  Usage:

  ~~~js ${`
  <Filter
    label='Filter label'
    options={[
      {name: 'Option 1', id: '1'},
      {name: 'Option 2', id: '2'},
    ]}${props || ''}
  />`}
  ~~~
`,
  },
})

const defautProps = getDefaultDropdownProps({ defaultText: 'Filter Label' })

storiesOf('Elements/Filter', module)
  .addDecorator(getBackgroundWrapper({ color: 'grey', style: { padding: '40px' } }))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        MultiselectDropdownStateWrapper,
        DropdownProvider,
      ]),
      propTables: [Filter],
      excludedPropTypes: ['inline', 'className', 'nameForClassName', 'render'],
    },
  })
  .add('default', () => <Filter {...defautProps} />, getInfoMD())
  .add(
    'active',
    () => <Filter {...defautProps} defaultValue={defautProps.options[0]} />,
    getInfoMD(`
    defaultValue={OPTIONS[0]}`)
  )
  .add(
    'disabled',
    () => <Filter {...defautProps} disabled />,
    getInfoMD(`
    disabled`)
  )
  .add(
    'multiselect',
    () => (
      <MultiselectDropdownStateWrapper>
        <Filter {...defautProps} multiselect />
      </MultiselectDropdownStateWrapper>
    ),
    getInfoMD(`
    multiselect
    selectedOptionsIds={['1']}`)
  )
