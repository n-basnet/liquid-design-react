import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { toPairs, omit } from 'ramda'

import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
  getStoriesByVersions,
} from '../helpers'
import { default as EnhancedButton, Button } from '~/elements/Button'

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedButton]),
    propTables: [Button],
  },
}

const getButtonSnippet = (propsString, children) => `
  <Button ${propsString ? `${propsString} ` : ''}onClick={onClickHandler}${children ? '' : ' /'}>${
  children ? `${children}</Button>` : ''
}
`

const icon = 'circleX'
const defaultProps = { children: 'Text', onClick: action('click button') }

const BUTTON_TOP_VERSIONS = [
  { name: 'Primary', props: {} },
  { name: 'Secondary', props: { appearance: 'secondary' } },
  { name: 'Highlight', props: { appearance: 'highlight' } },
  { name: 'Ghost', props: { appearance: 'ghost' } },
]

const getButtonStories = (props = {}) =>
  getStoriesByVersions({
    versions: [
      { name: 'small', props: { ...defaultProps, ...props } },
      {
        name: 'big',
        props: { size: 'big', ...defaultProps, ...props },
      },
    ],
    subversions: [
      {
        name: 'disabled',
        props: {
          disabled: true,
        },
      },
      { name: 'with icon', props: { icon } },
      { name: 'with icon disabled', props: { icon, disabled: true } },
      { name: 'with icon only', props: { icon, children: undefined } },
      { name: 'with icon only disabled', props: { icon, disabled: true, children: undefined } },
    ],
  })

BUTTON_TOP_VERSIONS.map(({ name: topVersionName, props: topVersionProps }) => {
  getButtonStories(topVersionProps).map(({ name, props }) => {
    const propsString = toPairs(omit(['children', 'onClick'], props))
      .map(
        ([key, value]) =>
          `${key}${value === true ? '' : '='}${
            value !== true ? (typeof value === 'string' ? `'${value}'` : `{${value}}`) : ''
          }`
      )
      .join(' ')

    storiesOf(`Elements/Button/${topVersionName}`, module)
      .addDecorator(getBackgroundWrapper())
      .addParameters(params)
      .add(
        name,
        () => <EnhancedButton {...props} />,
        getSnippetTemplate(getButtonSnippet(propsString, props.children))
      )
  })
})
