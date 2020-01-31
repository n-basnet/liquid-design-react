import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import EnhancedFooter, { Footer } from '../../src/modules/Footer'
import {
  getTextKnob,
  getSnippetTemplate,
  getPropTablesExcludeList,
} from '../helpers'

const getFooterText = () =>
  getTextKnob({
    name: 'headlineContent',
    defaultText: 'Get started today and bring your business idea to life.',
  })
const mainIconName = 'circleX'
const defaultText = 'Label Text'
const labelsTexts = [defaultText, defaultText, defaultText]
const iconsNamesAndActions = [
  { name: 'circleX', onClick: action('click') },
  { name: 'circleX', onClick: action('click') },
  { name: 'circleX', onClick: action('click') },
]

const getFooterSnippet = () => `
  <Footer
    headlineContent="Get started today and bring your business idea to …"
    iconsNamesAndActions={[
      { name: "circleX", onClick: onClickHandler },
      { name: "circleX", onClick: onClickHandler },
      { name: "circleX", onClick: onClickHandler },
    ]}
    labelsTexts={["Label Text", "Label Text", "Label Text"]}
    mainIconName="circleX"
  />
`

storiesOf('Modules/Footer', module)
  .addParameters({
    info: {
      propTables: [Footer],
      propTablesExclude: getPropTablesExcludeList([EnhancedFooter]),
    },
  })
  .add(
    'default',
    () => (
      <EnhancedFooter
        headlineContent={getFooterText()}
        iconsNamesAndActions={iconsNamesAndActions}
        labelsTexts={labelsTexts}
        mainIconName={mainIconName}
      />
    ),
    getSnippetTemplate(getFooterSnippet()),
  )
