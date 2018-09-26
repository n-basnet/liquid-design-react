import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import styled from 'styled-components'

import EnhancedWarningLabel, {
  WarningLabel,
  WARNING_LABELS_FILES,
  DEFAULT_WIDTH,
} from '~/elements/WarningLabel'
import EnhancedBowl, { Bowl } from '~/elements/Bowl'
import EnhancedPlaceholder, { Placeholder } from '~/elements/Placeholder'
import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { media } from '~/utils/styling'

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

const getParams = components => ({
  info: {
    propTablesExclude: getPropTablesExcludeList(components),
    excludedPropTypes: ['style', 'theme', 'className'],
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
  .addParameters(getParams([EnhancedPlaceholder]))
  .addDecorator(includeComponentInPropTable(Placeholder))
  .add(
    'default',
    () => <EnhancedPlaceholder width={getNumberKnob(150)} />,
    getCodeSnippet('<Placeholder />')
  )
  .add(
    'square',
    () => <EnhancedPlaceholder isSquare width={getNumberKnob(150)} />,
    getCodeSnippet('<Placeholder isSquare />')
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
    getCodeSnippet('<Placeholder isRectangular />')
  )

storiesOf('Elements/Graphics', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams([EnhancedBowl]))
  .addDecorator(includeComponentInPropTable(Bowl))
  .add(
    'Bowl',
    () => (
      <EnhancedBowl
        percent={number('percent', 50, { range: true, min: 0, max: 100, step: 1 })}
        width={getNumberKnob(180)}
      />
    ),
    getCodeSnippet('<Bowl />')
  )

storiesOf('Elements/Graphics', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams([WarningLabelsGroupWrapper, WarningLabelWrapper, EnhancedWarningLabel]))
  .addDecorator(includeComponentInPropTable(WarningLabel, { name: 'Flammable' }))
  .add(
    'Warning Labels',
    () => (
      <WarningLabelsGroupWrapper>
        {Object.keys(WARNING_LABELS_FILES).map((name, i) => (
          <WarningLabelWrapper key={i}>
            <span>{name}</span>
            <EnhancedWarningLabel
              name={name}
              width={number('width', DEFAULT_WIDTH, { range: true, min: 20, max: 200, step: 1 })}
            />
          </WarningLabelWrapper>
        ))}
      </WarningLabelsGroupWrapper>
    ),
    getCodeSnippet(`<WarningLabel name='CompressedGas' />`)
  )
