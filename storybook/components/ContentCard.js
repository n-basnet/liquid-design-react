import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
  Fragment,
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
      { name: 'Label 1', value: 'Value / Number 1' },
      { name: 'Label 2', value: 'Value / Number 2' },
    ]}${props || ``}
  />
`

class ContentCardApp extends PureComponent {
  static propTypes = {
    amount: PropTypes.number,
    withBootstrap: PropTypes.bool,
  }
  static defaultProps = {
    amount: null,
    withBootstrap: false,
  }
  state = {
    cardActiveIndex: null,
    isCardActive: false,
  }
  setCardActiveIndex = index => {
    this.setState({ cardActiveIndex: index })
  }
  toggleCardActive = () => {
    this.setState(({ isCardActive }) => ({ isCardActive: !isCardActive }))
  }
  render() {
    const { cardActiveIndex, isCardActive } = this.state
    const { amount, withBootstrap, ...props } = this.props
    return times(amount).map(
      index =>
        withBootstrap ? (
          <div key={index} className='col-md-4 col-sm-6 d-flex justify-content-center my-2 px-2'>
            <EnhancedContentCard
              {...getDefaultProps()}
              active={index === cardActiveIndex}
              style={{ margin: 0 }}
              onClick={() => this.setCardActiveIndex(index)}
              {...props}
            />
          </div>
        ) : (
          <EnhancedContentCard
            {...getDefaultProps()}
            key={index}
            style={{ margin: 0 }}
            active={isCardActive}
            onClick={this.toggleCardActive}
            {...props}
          />
        )
    )
  }
}

const getContentCardAppSnippet = props => `
  class ContentCardApp extends PureComponent {
    state = {
      isCardActive: false
    }
    toggleCardActive = () => {
      this.setState(({isCardActive}) => ({isCardActive: !isCardActive}))
    }
    render () {
      const { isCardActive } = this.state

      return (
        <ContentCard active={isCardActive} onClick={this.toggleCardActive}${props || ``} />
      )
    }
  }
`
const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedContentCard, ContentCardApp]),
  },
}

storiesOf('Components/ContentCard', module)
  .addDecorator(getBackgroundWrapper({ color: 'dark' }))
  .addDecorator(includeComponentInPropTable(ContentCard, getDefaultProps()))
  .addParameters(params)
  .add(
    'default',
    () => <ContentCardApp amount={1} />,
    getSnippetTemplate(getContentCardAppSnippet())
  )
  .add(
    'default with image',
    () => (
      <ContentCardApp
        amount={1}
        imagePath={getTextKnob({
          name: 'image',
          defaultText: 'https://images.unsplash.com/photo-1521028640727-38d16fc99ba1?w=400&h=400',
        })}
      />
    ),
    getSnippetTemplate(
      getContentCardAppSnippet(`
    imagePath="https://images.unsplash.com/photo-1521028640727-38…"`)
    )
  )
  .add(
    'stacked',
    () => <ContentCardApp stacked />,
    getSnippetTemplate(
      getContentCardAppSnippet(`
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
      <ContentCardApp
        amount={1}
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
      getContentCardAppSnippet(`
    description="lorem ipsum dolor sit amet, consectetur adipiscing…"
    featured="e.g. Amount, etc."`)
    )
  )
  .add(
    'with badge',
    () => (
      <ContentCardApp
        amount={1}
        badge={{
          children: getTextKnob({ defaultText }),
        }}
      />
    ),
    getSnippetTemplate(
      getContentCardAppSnippet(`
    badge={{children: 'Delivery in 3-4 days'}}`)
    )
  )
  .add(
    'with badge with icon',
    () => (
      <ContentCardApp
        amount={1}
        badge={{
          children: getTextKnob({ defaultText }),
          icon: 'star',
        }}
      />
    ),
    getSnippetTemplate(
      getContentCardAppSnippet(`
    badge={{children: 'Delivery in 3-4 days',icon: 'star'}}`)
    )
  )
  .add(
    'with badge with icon on the right side',
    () => (
      <ContentCardApp
        amount={1}
        badge={{
          children: getTextKnob({ defaultText }),
          iconRight: 'star',
        }}
      />
    ),
    getSnippetTemplate(
      getContentCardAppSnippet(`
    badge={{children: 'Delivery in 3-4 days',iconRight: 'star'}}`)
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
            <ContentCardApp amount={9} withBootstrap />
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
