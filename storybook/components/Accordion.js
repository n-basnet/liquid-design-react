import React from 'react'
import { storiesOf } from '@storybook/react'

import { default as EnhancedAccordion, Accordion } from '~/components/Accordion'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  placeholderText,
  includeComponentInPropTable,
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
  .add('default single', () => <EnhancedAccordion {...defaultProps} />)
  .add('default stacked', () => (
    <section>
      <EnhancedAccordion {...defaultProps} />
      <EnhancedAccordion {...defaultProps} />
      <EnhancedAccordion {...defaultProps} />
    </section>
  ))
