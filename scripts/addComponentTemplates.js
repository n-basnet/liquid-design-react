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
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import ${name} from '.'

describe('${name}', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Theme>
        <${name} />
      </Theme>
    )
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
