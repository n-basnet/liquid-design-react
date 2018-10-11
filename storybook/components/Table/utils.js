import { getSnippetTemplate } from '../../helpers'

const getRowSnippet = ({ withRowContent }, name) =>
  withRowContent ? `, {rowInfo: 'Some additional info about ${name}.'}` : ''

export const DISABLED_ROW_INDEXES = [7]

export const getSnippet = (props, tableProps) => {
  const propsSnippet = Object.keys(tableProps)
    .map(prop => (prop === 'size' ? `size='${tableProps.size}'` : prop))
    .join(' ')

  return getSnippetTemplate(
    `
    <Table
    columns={['Name', 'Age']}
    rows={[
      ['Thomas', 24${getRowSnippet(props, 'Thomas')}],
      ['Marion', 42${getRowSnippet(props, 'Marion')}],
    ]}
    disabledRowsIndexes={[1]}${
  propsSnippet
    ? `
    ${propsSnippet}`
    : ''
}
  />
`
  )
}
