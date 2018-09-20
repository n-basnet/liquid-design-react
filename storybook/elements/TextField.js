import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { media } from '~/utils/styling'

import TextField, { TEXT_FIELD_CLASSNAMES } from '~/elements/TextField'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getTextKnob,
  getStoriesByVersions,
  getSnippetTemplate,
} from '../helpers'

const getDefaultProps = () => ({
  placeholder: getTextKnob({ defaultText: 'Add Placeholder Text here', name: 'placeholder' }),
  label: getTextKnob({ defaultText: 'Text Area label', name: 'label' }),
})

const TextFieldStoryWrapper = styled.div`
  .${TEXT_FIELD_CLASSNAMES.SINGLE} {
    width: 300px;
  }
  .${TEXT_FIELD_CLASSNAMES.MULTILINE} {
    width: 350px;
  }
  ${media.customMax(500)`
    .${TEXT_FIELD_CLASSNAMES.BASE} {
      width: 100%;
    }
  `};
`

const getTextFieldSnippet = props => `
  <TextField placeholder="Add Placeholder Text here" label="Text Area label" ${props || ``} />
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
  const propsSnippet = Object.keys(props)
    .map(prop => (prop === 'validate' ? `validate={validateHandler}` : prop))
    .join(' ')
  storiesOf('Elements/TextField', module)
    .addDecorator(storyFn => <TextFieldStoryWrapper>{storyFn()}</TextFieldStoryWrapper>)
    .addDecorator(getBackgroundWrapper())
    .addParameters({
      info: {
        propTablesExclude: getPropTablesExcludeList([TextFieldStoryWrapper]),
      },
    })
    .add(
      name,
      () => <TextField {...getDefaultProps()} {...props} />,
      getSnippetTemplate(getTextFieldSnippet(propsSnippet))
    )
})
