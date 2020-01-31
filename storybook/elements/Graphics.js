import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import styled from 'styled-components'

import EnhancedWarningLabel, {
  WarningLabel,
  WARNING_LABELS_FILES,
  DEFAULT_WIDTH,
} from '../../src/elements/WarningLabel'
import Bowl from '../../src/elements/Bowl'
import EnhancedPlaceholder, {
  Placeholder,
} from '../../src/elements/Placeholder'
import { getBackgroundWrapper, getPropTablesExcludeList } from '../helpers'
import { media } from '../../src/utils/styling'

const WarningLabelsGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  span {
    display: inline-block;
    font-size: 12px;
    margin-bottom: 20px;
  }
`
const WarningLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
  margin-right: 10px;
  ${media.min.phone`
    min-width: 150px;
  `};
`

const getParams = (excludedComponents, includedComponents) => ({
  info: {
    propTablesExclude: getPropTablesExcludeList(excludedComponents),
    excludedPropTypes: ['style', 'theme', 'className'],
    propTables: includedComponents,
  },
})

const getNumberKnob = (num, name = 'width') =>
  number(name, num, { range: true, min: 40, max: 300, step: 1 })

const getCodeSnippet = code => ({
  info: {
    text: `
  ~~~js
  ${code}
  ~~~
`,
  },
})

storiesOf('Elements/Graphics/Placeholder', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams([EnhancedPlaceholder], [Placeholder]))
  .add(
    'default',
    () => <EnhancedPlaceholder width={getNumberKnob(150)} />,
    getCodeSnippet('<Placeholder />'),
  )
  .add(
    'square',
    () => <EnhancedPlaceholder isSquare width={getNumberKnob(150)} />,
    getCodeSnippet('<Placeholder isSquare />'),
  )
  .add(
    'rectangular',
    () => (
      <EnhancedPlaceholder
        isRectangular
        width={getNumberKnob(200)}
        height={getNumberKnob(100, 'height')}
      />
    ),
    getCodeSnippet('<Placeholder isRectangular />'),
  )

storiesOf('Elements/Graphics', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams([], [Bowl]))
  .add(
    'Bowl',
    () => (
      <Bowl
        percent={number('percent', 50, {
          range: true,
          min: 0,
          max: 100,
          step: 1,
        })}
        width={getNumberKnob(180)}
      />
    ),
    getCodeSnippet('<Bowl />'),
  )

storiesOf('Elements/Graphics', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(
    getParams(
      [WarningLabelsGroupWrapper, WarningLabelWrapper, EnhancedWarningLabel],
      [WarningLabel],
    ),
  )
  .add(
    'Warning Labels',
    () => (
      <WarningLabelsGroupWrapper>
        {Object.keys(WARNING_LABELS_FILES).map((name, i) => (
          <WarningLabelWrapper key={i}>
            <span>{name}</span>
            <EnhancedWarningLabel
              name={name}
              width={number('width', DEFAULT_WIDTH, {
                range: true,
                min: 20,
                max: 200,
                step: 1,
              })}
            />
          </WarningLabelWrapper>
        ))}
      </WarningLabelsGroupWrapper>
    ),
    getCodeSnippet("<WarningLabel name='CompressedGas' />"),
  )
