import React from 'react'
import { storiesOf } from '@storybook/react'

import EnhancedAccordion, { Accordion } from '../../src/components/Accordion'
import { times } from '../../src/utils/misc'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  placeholderText,
  includeComponentInPropTable,
  getSnippetTemplate,
} from '../helpers'

const defaultProps = {
  title: 'Section title',
  children: placeholderText(72),
}

const getAccordionSnippet = () => `
  <Accordion title="Section title">
    lorem ipsum dolor sit amet, consectetur adipiscing…
  </Accordion>`

storiesOf('Components/Accordion', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Accordion, defaultProps))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedAccordion]),
    },
  })
  .add(
    'default single',
    () => <EnhancedAccordion {...defaultProps} />,
    getSnippetTemplate(getAccordionSnippet()),
  )
  .add(
    'default stacked',
    () => (
      <section>
        <EnhancedAccordion {...defaultProps} />
        <EnhancedAccordion {...defaultProps} />
        <EnhancedAccordion {...defaultProps} />
      </section>
    ),
    getSnippetTemplate(`
  <section>${times(3)
    .map(getAccordionSnippet)
    .join(' ')}
  </section>
  `),
  )
