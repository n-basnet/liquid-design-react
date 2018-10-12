import React from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedAccordion, Accordion } from '~/components/Accordion'
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
    getSnippetTemplate(`
      <Accordion title="Section title">
        lorem ipsum dolor sit amet, consectetur adipiscing…
      </Accordion>
  `)
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
      <section>
        <Accordion title="Section title">
          lorem ipsum dolor sit amet, consectetur adipiscing…
        </Accordion>
        <Accordion title="Section title">
          lorem ipsum dolor sit amet, consectetur adipiscing…
        </Accordion>
        <Accordion title="Section title">
          lorem ipsum dolor sit amet, consectetur adipiscing…
        </Accordion>
      </section>
    `)
  )
