import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTablesExcludeList, getBackgroundWrapper } from '../helpers'
import {
  getDefaultDropdownProps,
  MultiselectDropdownStateWrapper,
} from '../helpers/dropdown'
import Dropdown from '../../src/elements/Dropdown'
import { DropdownProvider } from '../../src/elements/misc/DropdownProvider'

const getInfoMD = props => ({
  info: {
    text: `
  Dropdowns or select fields enable the user to select one option from a list of multiple options. The selection of an option can affect other form elements on the same page/screen.

  Usage:

  ~~~js ${`
  <Dropdown
    label='Dropdown label'
    options={[
      {name: 'Option 1', id: '1'},
      {name: 'Option 2', id: '2'},
    ]}${props || ''}
  />`}
  ~~~
`,
  },
})

const defautProps = getDefaultDropdownProps({ defaultText: 'Dropdown Label' })

storiesOf('Elements/Dropdown', module)
  .addDecorator(
    getBackgroundWrapper({ color: 'grey', style: { padding: '40px' } }),
  )
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        MultiselectDropdownStateWrapper,
        DropdownProvider,
      ]),
      propTables: [Dropdown],
      excludedPropTypes: ['className', 'nameForClassName', 'render'],
    },
  })
  .add('default', () => <Dropdown {...defautProps} />, getInfoMD())
  .add(
    'active',
    () => <Dropdown {...defautProps} defaultValue={defautProps.options[0]} />,
    getInfoMD(`
    defaultValue={OPTIONS[0]}`),
  )
  .add(
    'disabled',
    () => <Dropdown {...defautProps} disabled />,
    getInfoMD(`
    disabled`),
  )
  .add(
    'inline',
    () => <Dropdown {...defautProps} inline />,
    getInfoMD(`
    inline`),
  )
  .add(
    'inline active',
    () => (
      <Dropdown {...defautProps} inline defaultValue={defautProps.options[0]} />
    ),
    getInfoMD(`
    inline
    defaultValue={OPTIONS[0]}`),
  )
  .add(
    'inline disabled',
    () => <Dropdown {...defautProps} inline disabled />,
    getInfoMD(`
    inline disabled`),
  )
  .add(
    'multiselect',
    () => (
      <MultiselectDropdownStateWrapper>
        <Dropdown {...defautProps} multiselect />
      </MultiselectDropdownStateWrapper>
    ),
    getInfoMD(`
    multiselect
    selectedOptionsIds={['1']}`),
  )
  .add(
    'multiselect inline',
    () => (
      <MultiselectDropdownStateWrapper>
        <Dropdown {...defautProps} multiselect inline />
      </MultiselectDropdownStateWrapper>
    ),
    getInfoMD(`
    multiselect
    inline
    selectedOptionsIds={['1']}`),
  )
  .add(
    'multiselect disabled',
    () => (
      <MultiselectDropdownStateWrapper>
        <Dropdown {...defautProps} multiselect disabled />
      </MultiselectDropdownStateWrapper>
    ),
    getInfoMD(`
    multiselect
    selectedOptionsIds={['1']}`),
  )
