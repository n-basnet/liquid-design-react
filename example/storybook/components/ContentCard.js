import React from 'react'
import { storiesOf } from '@storybook/react'

import { ContentCard } from 'liquid-design-react'

storiesOf('ContentCard', module)
  .add('default', () => (
    <ContentCard />
  ))
