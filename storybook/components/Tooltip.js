import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  includeComponentInPropTable,
  formatList,
  placeholderText,
  getSnippetTemplate,
} from '../helpers'
import WrappedTooltip, { Tooltip } from '../../src/components/Tooltip'
import { WALLS_KEYS, SIDES_KEYS } from '../../src/components/Tooltip/consts'
import { media } from '../../src/utils/styling'

const ContentWrapper = styled.div`
  strong {
    font-weight: 900;
    font-size: 14px;
  }
  div {
    margin-top: 7px;
    margin-bottom: 14px;
    font-size: 12px;
    line-height: 21px;
  }
`

const Wrapper = styled.div`
  display: inline-block;
  min-width: 150px;
  margin: 20px;
`

const GroupWrapper = styled.div`
  padding: 30px 50px;
  ${media.customMin(600)`
    padding: 90px 220px;
  `};
`

const SampleContent = () => (
  <ContentWrapper>
    <strong>Headline</strong>
    <div>{placeholderText(19)}</div>
  </ContentWrapper>
)

storiesOf('Components/Tooltip', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Tooltip, { children: '' }))
  .addParameters({
    info: {
      source: false,
      excludedPropTypes: ['className'],
      propTablesExclude: getPropTablesExcludeList([
        WrappedTooltip,
        ContentWrapper,
        Wrapper,
        GroupWrapper,
        SampleContent,
      ]),
    },
  })
  .add(
    'open',
    () => (
      <div style={{ paddingBottom: '180px' }}>
        <WrappedTooltip isOpen>
          <SampleContent />
        </WrappedTooltip>
      </div>
    ),
    getSnippetTemplate('<Tooltip isOpen>Tooltip content</Tooltip>'),
  )
  .add(
    'default',
    () => (
      <GroupWrapper>
        {WALLS_KEYS.map(wall =>
          SIDES_KEYS.map(side => (
            <Wrapper key={`${wall}-${side}`}>
              <div>{`wall: ${wall}, side: ${side}`}</div>
              <WrappedTooltip wall={wall} side={side}>
                <SampleContent />
              </WrappedTooltip>
            </Wrapper>
          )),
        )}
      </GroupWrapper>
    ),
    {
      info: {
        text: `
          Tooltip has ${WALLS_KEYS.length *
            SIDES_KEYS.length} possible placements, from the perspective of the Tooltip content: each wall (${formatList(
          WALLS_KEYS,
        )}) can have the arrow placed on either side (${formatList(
          SIDES_KEYS,
        )}).

          ~~~js
          <Tooltip>some content</Tooltip>
          ~~~
        `,
      },
    },
  )
