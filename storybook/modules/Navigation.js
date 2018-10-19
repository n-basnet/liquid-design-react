import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, getPropTablesExcludeList, getSnippetTemplate } from '../helpers'
import { default as EnhancedNavigation, Navigation } from '~/modules/Navigation'
import NavigationStateWrapper from '~/modules/Navigation/NavigationStateWrapper/NavigationStateWrapper'

const activeTabIndex = 0

storiesOf('Modules/Navigation', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTables: [Navigation],
      propTablesExclude: getPropTablesExcludeList([EnhancedNavigation, NavigationStateWrapper]),
    },
  })
  .add(
    'default',
    () => (
      <NavigationStateWrapper activeTabIndex={activeTabIndex}>
        {({ activeTabIndex, handleTabClick }) => (
          <Navigation
            title='Title 01'
            activeTabIndex={activeTabIndex}
            tabs={[
              {
                title: 'Nav title',
                iconName: 'placeholder',
                onClick: handleTabClick,
              },
              {
                title: 'Nav title',
                iconName: 'placeholder',
                onClick: handleTabClick,
              },
              {
                title: 'Nav title',
                iconName: 'placeholder',
                onClick: handleTabClick,
              },
            ]}
          />
        )}
      </NavigationStateWrapper>
    ),
    getSnippetTemplate(
      `
    <Navigation
      title='Navbar title'
      iconName='settings' // select either iconName for Nav icon from Glyphs list
      iconUrl='path/to/image.jpg' // or set url for custom image
      tabs={[
        {
          title: 'Nav title',
          iconName: 'placeholder', // we can use built-in glyphs
          href: 'http://some-url', // href for default redirect
          active: true,
        },
        {
          title: 'Nav title',
          iconUrl: 'http://link-to-icon.png',  // or us custom images as icons
          onClick: redirectFn, // custom routing handled by function
        },
      ]}
    />
    `,
      `Navigation component contains useful navigation structure. It takes array of _tabs_, _title_ and _image data_ as arguments.
      By default a placeholder will be set. If we want to set our own icon we can pass _iconName_ or _iconUrl_ .
      Every single tab consists of _title_, _href_ or _onClick_ and _icon data_.
      Passing optional _active_ field, sets tab to active.`
    )
  )
  .add('with 8 tabs', () => (
    <NavigationStateWrapper activeTabIndex={activeTabIndex}>
      {({ activeTabIndex, handleTabClick }) => (
        <Navigation
          title='Title 01'
          activeTabIndex={activeTabIndex}
          tabs={[
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
            {
              title: 'Nav title',
              iconName: 'placeholder',
              onClick: handleTabClick,
            },
          ]}
        />
      )}
    </NavigationStateWrapper>
  ))
