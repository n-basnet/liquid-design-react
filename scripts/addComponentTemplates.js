const formatTypeString = v => `${v.replace(/^\w/, c => c.toUpperCase())}s`

const jsFileTemplate = ({ name }) =>
  `
import React from 'react'
import PropTypes from 'prop-types'

import attachClassName from '~/components/misc/hoc/attachClassName'

export const ${name} = ({...props}) =>
  <div {...props}>
    ${name}
  </div>

${name}.propTypes = {

}

const { Component } = attachClassName(${name})

export default Component
`

const testFileTemplate = ({ name }) =>
  `
import ${name} from '.'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'

describe('${name}', () => {
  const get${name}Wrapper = getWrapper(${name})
  everyComponentTestSuite(get${name}Wrapper, ${name}, '${name}')
})
`

const storybookFileTemplate = ({ name, type }) =>
  `
import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, getPropTablesExcludeList } from '../helpers'
import { default as Enhanced${name}, ${name} } from '~/${type}s/${name}'

storiesOf('${formatTypeString(type)}/${name}', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([Enhanced${name}]),
      propTables: [${name}],
    },
  })
  .add('default', () => (
    <${name} />
  ))
`

module.exports = {
  jsFileTemplate,
  testFileTemplate,
  storybookFileTemplate,
}
