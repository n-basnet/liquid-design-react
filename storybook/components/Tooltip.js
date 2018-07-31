import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import { getBackgroundWrapper } from '../helpers'
import { Tooltip, default as WrappedTooltip } from '~/components/Tooltip'
import { WALLS_KEYS, SIDES_KEYS } from '~/components/Tooltip/consts'

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

const SampleContent = () => (
  <ContentWrapper>
    <strong>Headline</strong>
    <div>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna.
    </div>
  </ContentWrapper>
)

storiesOf('Components/Tooltip', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(storyFn => (
    <Fragment>
      {/* just to make addon-info aware of the original `Tooltip` props */}
      <div style={{ display: 'none' }}>
        <Tooltip>something</Tooltip>
      </div>
      {storyFn()}
    </Fragment>
  ))
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [
        WrappedTooltip,
        ContentWrapper,
        Wrapper,
        SampleContent,
        Fragment,
      ],
    },
  })
  .add(
    'default',
    () => (
      <div style={{ padding: '90px 220px' }}>
        {WALLS_KEYS.map(wall =>
          SIDES_KEYS.map(side => (
            <Wrapper key={`${wall}-${side}`}>
              <div>{`wall: ${wall}, side: ${side}`}</div>
              <WrappedTooltip wall={wall} side={side}>
                <SampleContent />
              </WrappedTooltip>
            </Wrapper>
          ))
        )}
      </div>
    ),
    {
      info: {
        text: `
          ~~~js
          <Tooltip>some content</Tooltip>
          ~~~
        `,
      },
    }
  )
