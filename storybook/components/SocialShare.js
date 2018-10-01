import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, getPropTablesExcludeList, getSnippetTemplate } from '../helpers'
import { default as EnchancedSocialShare, SocialShare } from '~/elements/SocialShares'

const getSocialShareSnippet = props => `
  <SocialShare ${props} />
`
const STORIES = [
  'facebook',
  'slack',
  'instagram',
  'mail',
  'snapchat',
  'salesforce',
  'twitter',
  'skype',
  'linkedin',
  'teams',
  'flickr',
  'xing',
]

STORIES.map(name => {
  storiesOf('Components/SocialShare', module)
    .addDecorator(getBackgroundWrapper())
    .addParameters({
      info: {
        propTablesExclude: getPropTablesExcludeList([EnchancedSocialShare]),
        propTables: [SocialShare],
      },
    })
    .add(
      name,
      () => <EnchancedSocialShare hasLabel type={name} />,
      getSnippetTemplate(getSocialShareSnippet(`hasLabel type='${name}'`))
    )
    .add(
      `${name} without label`,
      () => <EnchancedSocialShare type={name} />,
      getSnippetTemplate(getSocialShareSnippet(`type='${name}'`))
    )
})
