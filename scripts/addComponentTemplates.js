const jsFileTemplate = ({name}) =>
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

const testFileTemplate = ({name}) =>
  `
import React from 'react'
import { shallow } from 'enzyme'

import ${name} from '.'

describe('${name}', () => {
  it('renders', () => {
    const wrapper = shallow(
      <${name} />
    )
    expect(wrapper).toBeTruthy()
  })
})
`

const storybookFileTemplate = ({name}) =>
  `
import React from 'react'
import { storiesOf } from '@storybook/react'

import { ${name} } from 'liquid-design-react'

storiesOf('${name}', module)
  .add('default', () => (
    <${name} />
  ))
`

module.exports = {
  jsFileTemplate,
  testFileTemplate,
  storybookFileTemplate,
}
