import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import EnhancedCircularProgressBar, {
  CircularProgressBar,
  CIRCULAR_PROGRESS_BAR_CLASSNAME,
} from '../../src/components/CircularProgressBar'
import { media } from '../../src/utils/styling'
import { DEFAULT_THEME } from '../../src/utils/consts/themes'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'
import getProgressBarApp from './ProgressBarApp'

const getDefaultProps = () => ({
  label: getTextKnob({ defaultText: 'Label' }),
})

const CircularProgressBarApp = getProgressBarApp(EnhancedCircularProgressBar)

const CircularProgressBarStoryWrapper = styled.div`
  .${CIRCULAR_PROGRESS_BAR_CLASSNAME} {
    ${media.customMax(220)`
      div {
        font-size: 26px;
      }
    `};
  }
`

const getCodeSnippet = props =>
  getSnippetTemplate(`
  <CircularProgressBar ${props} />
`)

storiesOf('Components/CircularProgressBar', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(
    includeComponentInPropTable(CircularProgressBar, { theme: DEFAULT_THEME }),
  )
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        EnhancedCircularProgressBar,
        CircularProgressBarStoryWrapper,
        CircularProgressBarApp,
      ]),
      excludedPropTypes: ['theme', 'className'],
    },
  })
  .addDecorator(storyFn => (
    <CircularProgressBarStoryWrapper>
      {storyFn()}
    </CircularProgressBarStoryWrapper>
  ))
  .add(
    'default',
    () => <CircularProgressBarApp {...getDefaultProps()} />,
    getCodeSnippet('value={50}'),
  )
  .add(
    'overdue',
    () => <CircularProgressBarApp {...getDefaultProps()} defaultValue={150} />,
    getCodeSnippet('value={150}'),
  )
  .add(
    'disabled',
    () => <CircularProgressBarApp {...getDefaultProps()} disabled />,
    getCodeSnippet('value={50} disabled'),
  )
  .add(
    'using theme colors',
    () => <CircularProgressBarApp {...getDefaultProps()} useThemeColors />,
    getCodeSnippet('value={50} useThemeColors'),
  )
