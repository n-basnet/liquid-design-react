import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import {
  default as EnhancedContentCard,
  ContentCard,
  CONTENT_CARD_CLASSNAME,
} from '~/components/ContentCard'
import {
  getPropTablesExcludeList,
  getBackgroundWrapper,
  getTextKnob,
  includeComponentInPropTable,
  getSnippetTemplate,
} from '../helpers'
import { times } from '~/utils/aux'

const defaultText = 'Delivery in 3-4 days'

const getLabels = () => [
  {
    name: getTextKnob({
      name: 'label 1 name',
      defaultText: 'Label 1',
    }),
    value: getTextKnob({
      name: 'label 1 value',
      defaultText: 'Value / Number 1',
    }),
  },
  {
    name: getTextKnob({
      name: 'label 2 name',
      defaultText: 'Label 2',
    }),
    value: getTextKnob({
      name: 'label 2 value',
      defaultText: 'Value / Number 2',
    }),
  },
]

const getDefaultProps = () => ({
  title: getTextKnob({
    name: 'title',
    defaultText: 'Title Name',
  }),
  labels: getLabels(),
})

const getContentCardSnippet = props => `
  <ContentCard
    title="Title Name"
    labels={[
      {name: 'Label 1',value: 'Value / Number 1'},
      {name: 'Label 2',value: 'Value / Number 2'},
    ]}${props || ``}
  />
`
const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedContentCard]),
  },
}

storiesOf('Components/ContentCard', module)
  .addDecorator(getBackgroundWrapper({ color: 'dark' }))
  .addDecorator(includeComponentInPropTable(ContentCard, getDefaultProps()))
  .addParameters(params)
  .add(
    'default',
    () => <EnhancedContentCard {...getDefaultProps()} />,
    getSnippetTemplate(getContentCardSnippet())
  )
  .add(
    'default with image',
    () => (
      <EnhancedContentCard
        imagePath={getTextKnob({
          name: 'image',
          defaultText: 'https://images.unsplash.com/photo-1521028640727-38d16fc99ba1?w=400&h=400',
        })}
        {...getDefaultProps()}
      />
    ),
    getSnippetTemplate(
      getContentCardSnippet(`
    imagePath="https://images.unsplash.com/photo-1521028640727-38…"`)
    )
  )
  .add(
    'stacked',
    () => <EnhancedContentCard {...getDefaultProps()} stacked />,
    getSnippetTemplate(
      getContentCardSnippet(`
    stacked`)
    )
  )
  .add(
    'active',
    () => <EnhancedContentCard {...getDefaultProps()} active />,
    getSnippetTemplate(
      getContentCardSnippet(`
    active`)
    )
  )
  .add(
    'with description and featured',
    () => (
      <EnhancedContentCard
        {...getDefaultProps()}
        description={getTextKnob({
          placeholderTextLength: 15,
        })}
        featured={getTextKnob({
          name: 'featured text',
          defaultText: 'e.g. Amount, etc.',
        })}
      />
    ),
    getSnippetTemplate(
      getContentCardSnippet(`
    description="lorem ipsum dolor sit amet, consectetur adipiscing…"
    featured="e.g. Amount, etc."`)
    )
  )
  .add(
    'with badge',
    () => (
      <EnhancedContentCard
        {...getDefaultProps()}
        badge={{
          text: getTextKnob({ defaultText }),
        }}
      />
    ),
    getSnippetTemplate(
      getContentCardSnippet(`
    badge={{text: 'Delivery in 3-4 days'}}`)
    )
  )
  .add(
    'with badge with icon',
    () => (
      <EnhancedContentCard
        {...getDefaultProps()}
        badge={{
          text: getTextKnob({ defaultText }),
          icon: 'star',
        }}
      />
    ),
    getSnippetTemplate(
      getContentCardSnippet(`
    badge={{text: 'Delivery in 3-4 days',icon: 'star'}}`)
    )
  )
  .add(
    'with badge with icon on the right side',
    () => (
      <EnhancedContentCard
        {...getDefaultProps()}
        badge={{
          text: getTextKnob({ defaultText }),
          iconRight: 'star',
        }}
      />
    ),
    getSnippetTemplate(
      getContentCardSnippet(`
    badge={{text: 'Delivery in 3-4 days',iconRight: 'star'}}`)
    )
  )

storiesOf('Components/ContentCard', module)
  .addDecorator(getBackgroundWrapper({ color: 'dark', padding: '0' }))
  .addDecorator(includeComponentInPropTable(ContentCard, getDefaultProps()))
  .addParameters(params)
  .add(
    'multiple',
    () => (
      <Fragment>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
          integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
          crossOrigin='anonymous'
        />
        <style>{`
          .${CONTENT_CARD_CLASSNAME} {
            width: 100%;
            max-width: none;
            min-width: 230px;
          }
          .container-fluid {
            max-width: 1200px;
          }
        `}</style>
        <div className='container-fluid py-4'>
          <div className='row'>
            {times(9).map(v => (
              <div key={v} className='col-md-4 col-sm-6 d-flex justify-content-center my-2 px-2'>
                <EnhancedContentCard {...getDefaultProps()} style={{ margin: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    ),
    {
      info: {
        text: `
    This example uses [Bootstarp grid](https://getbootstrap.com/docs/4.0/layout/grid/) to show how a layout system might be used to display multiple cards.
  `,
      },
    }
  )
