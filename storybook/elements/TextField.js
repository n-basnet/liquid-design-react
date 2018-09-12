import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { media } from '~/utils/styling'

import TextField, { FORM_INPUT_CLASSNAMES } from '~/elements/TextField'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getTextKnob,
  getStoriesByVersions,
} from '../helpers'

const getDefaultProps = () => ({
  placeholder: getTextKnob({ defaultText: 'Add Placeholder Text here', name: 'placeholder' }),
  label: getTextKnob({ defaultText: 'Text Area label', name: 'label' }),
})

const TextFieldStoryWrapper = styled.div`
  .${FORM_INPUT_CLASSNAMES.SINGLE} {
    width: 300px;
  }
  .${FORM_INPUT_CLASSNAMES.MULTILINE} {
    width: 350px;
  }
  ${media.customMax(500)`
    .${FORM_INPUT_CLASSNAMES.BASE} {
      width: 100%;
    }
  `};
`

const STORIES = getStoriesByVersions({
  versions: [
    { name: 'grey', props: { grey: true } },
    { name: 'grey multiline', props: { multiline: true, grey: true } },
    { name: 'multiline', props: { multiline: true } },
  ],
  subversions: [
    { name: 'disabled', props: { disabled: true } },
    {
      name: 'error',
      props: {
        validate: () => getTextKnob({ defaultText: 'Error message', name: 'error message' }),
      },
    },
  ],
})

STORIES.map(({ name, props }) => {
  storiesOf('Elements/TextField', module)
    .addDecorator(storyFn => <TextFieldStoryWrapper>{storyFn()}</TextFieldStoryWrapper>)
    .addDecorator(getBackgroundWrapper())
    .addParameters({
      info: {
        propTablesExclude: getPropTablesExcludeList([TextFieldStoryWrapper]),
      },
    })
    .add(name, () => <TextField {...getDefaultProps()} {...props} />)
})
