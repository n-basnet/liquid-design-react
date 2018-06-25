import React from 'react'
import { storiesOf } from '@storybook/react'

import ExampleComponent from 'liquid-design-react'

storiesOf('ExampleComponent', module)
  .add('with text', () => (
    <ExampleComponent text='Modern React component module' />
  ))
