const formatTypeString = v => `${v.replace(/^\w/, c => c.toUpperCase())}s`

const jsFileTemplate = ({ name }) =>
  `
import React from 'react'
import PropTypes from 'prop-types'

const ${name} = () =>
  <div>
    ${name}
  </div>

${name}.propTypes = {

}

export default ${name}
`

const testFileTemplate = ({ name }) =>
  `
import React from 'react'
import { mount } from 'enzyme'

import Theme from '~/Theme'
import ${name} from '.'

describe('${name}', () => {
  const getWrapper = (props = {}) =>
    mount(
      <Theme>
        <${name} {...props} />
      </Theme>
    )

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper).toBeTruthy()
  })
})
`

const storybookFileTemplate = ({ name, type }) =>
  `
import React from 'react'
import { storiesOf } from '@storybook/react'

import { ${name} } from '~'

storiesOf('${formatTypeString(type)}/${name}', module)
  .add('default', () => (
    <${name} />
  ))
`

module.exports = {
  jsFileTemplate,
  testFileTemplate,
  storybookFileTemplate,
}
