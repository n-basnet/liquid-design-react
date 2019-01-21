import React from 'react'
import { action } from '@storybook/addon-actions'
import { values, zipObj, prop } from 'ramda'

import { times } from '~/utils/misc'
import {
  getSnippetTemplate,
  getCustomPlaceholderText,
  getDeterministicPlaceholderText,
  objectToJSXAttrs,
} from '../../helpers'
import { NameCell, RegularCell, RowInfoWrapper } from './cells'
import { SORT_MODES } from '~/components/Table/utils'

const onChange = action('row change')

const getData = (cols, rowsAmount, config = {}) =>
  times(rowsAmount).map(rowIndex => ({
    // create {[col header]: row} object
    ...zipObj(
      cols.map(
        config.forSnippet ? (v, i) => config.forSnippet.keys[i].toLowerCase() : prop('header')
      ),
      cols.map((col, i) => {
        const seed = i * rowIndex + 1
        const isInFirstCol = i === 0
        return config.forSnippet
          ? i === 0
            ? getDeterministicPlaceholderText(rowIndex + 10, 1)
            : `${i + 10}`
          : {
            rowIndex,
            label: isInFirstCol
              ? `label ${rowIndex + 1}`
              : getDeterministicPlaceholderText(seed, 2),
            value: isInFirstCol
              ? `Name ${rowIndex + 1}`
              : getDeterministicPlaceholderText(seed + 10),
            ...(isInFirstCol && {
              auxText: 'Info',
            }),
          }
      })
    ),
    ...(!config.forSnippet && {
      onChange,
    }),
    ...(config.withRowContent && {
      rowInfo: config.forSnippet ? (
        `More information`
      ) : (
        <RowInfoWrapper>{getCustomPlaceholderText()}</RowInfoWrapper>
      ),
    }),
    // every second one selected
    ...(config.isSelectable &&
      rowIndex % 2 === 0 && {
      isDefaultChecked: true,
    }),
  }))

const getColumns = (columnsAmount, config = {}) =>
  times(columnsAmount).map(colIndex => {
    const header = `Column ${(colIndex + 1).toString().padStart(2, '0')}`
    return {
      header: config.forSnippet ? config.forSnippet.keys[colIndex] : header,
      accessor: prop(header),
      ...(!config.forSnippet && {
        cellRenderer: props => {
          const Component = colIndex === 0 ? NameCell : RegularCell
          return <Component {...props} {...config} />
        },
      }),
    }
  })

export const getDefaultProps = ({ rowsAmount, columnsAmount }, config) => {
  const columns = getColumns(columnsAmount, config)
  return {
    columns,
    rows: getData(columns, rowsAmount, config),
  }
}

export const DISABLED_ROW_INDEXES = [7]

export const getSnippet = ({ props, tableProps, hideCode, auxText }) => {
  const defProps = getDefaultProps(
    { rowsAmount: 2, columnsAmount: 2 },
    { forSnippet: { keys: ['Name', 'Age'] }, ...props }
  )
  const propsSnippet = objectToJSXAttrs({ ...defProps, ...tableProps })

  return getSnippetTemplate(
    hideCode
      ? ''
      : `
    <Table
    ${propsSnippet}
    disabledRowsIndexes={[1]}
  />
`,
    `
${auxText || ''}
Tables are used to put content into a ordered grid. The first line is always the header line and defines the content below for each column. Each column can be sorted.

The objects in \`columns\` and \`rows\` arrays have the following specification:

#### \`columns\` element

prop | description
--- | ---
\`header\` | String or a function. Function will be called with the column object as argument and should return a React node.
\`accessor\` | A function that will pick the cell given the row object (e.g. \`row => row.name\`)
\`cellRenderer\` | Optional rendering function for a cell. Will receive arguments: cell data, row data.
\`sortMethod\` | Optional custom sort method. Should implement native JS \`Array.sort\` interface.
\`onSort\` | If set, the column data will not be sorted internally, assuming that the data is already sorted. The function will be called with a single argument: \`{ sortColumn: <column object>, sortMode: <${values(
    SORT_MODES
  )
    .map(v => `"${v}"`)
    .join(
      ' / '
    )}> }\`. Can be used to fetch data and update the props passed to the component to perform external sort.

#### \`rows\` element

prop | description
--- | ---
data key | The data for a cell (string or object) - this key will be accessed by the corresponding column's \`accessor\`. If it's an object, sorting (unless overriden with \`onSort\`) will be based on the \`value\` key of this object.
\`rowInfo\` | React node with additional information to be displayed on clicking on a row.
\`isDefaultChecked\` | If Table is \`isSelectable\`, this will be the default value for the row's checkbox.
\`onChange\` | Triggered on row click - the argument passed will be an object: \`{cells: <original row object>, rowState: <updated row state>}\`

    `
  )
}
