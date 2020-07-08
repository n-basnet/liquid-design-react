import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import EnhancedSearchBar, { SearchBar } from '../../src/components/SearchBar'
import { Button } from '../../src/elements/Button'
import {
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getTextKnob,
  getSnippetTemplate,
} from '../helpers'
import { times } from '../../src/utils/misc'

class SearchBarApp extends PureComponent {
  constructor(props) {
    super(props)
    this.searchRef = React.createRef()
  }

  state = {
    options: ['Search Result 1', 'Search Result 2'],
  }

  render() {
    return (
      <>
        <EnhancedSearchBar
          wrappedRef={el => {
            this.searchRef = el
          }}
          {...{
            onSubmit: action('submit'),
            placeholder: getTextKnob({
              defaultText: 'Search…',
              name: 'placeholder',
            }),
            options: this.state.options,
          }}
        />
        <Button
          style={{ marginLeft: '20px' }}
          onClick={() => {
            this.searchRef.setState({
              value: '',
            })
          }}
        >
          Clear
        </Button>
        <Button
          style={{ marginLeft: '20px' }}
          onClick={() => {
            this.setState({
              options: [
                ...this.state.options,
                `Search Result ${this.state.options.length + 1}`,
                `Search Result ${this.state.options.length + 2}`,
              ],
            })
          }}
        >
          Add options
        </Button>
      </>
    )
  }
}

const getOptions = () =>
  times(4).map(v =>
    getTextKnob({
      defaultText: `Search Result ${v + 1}`,
      name: `result ${v + 1}`,
    }),
  )

const getSearchBarSnippet = props => `
  <SearchBar
    onSubmit={handleSubmit}
    options={[
      'Search Result 1',
      'Search Result 2',
      'Search Result 3',
      'Search Result 4',
    ]}${props || ''}
  />
`

const getDefaultProps = () => ({
  onSubmit: action('submit'),
  placeholder: getTextKnob({ defaultText: 'Search…', name: 'placeholder' }),
  options: getOptions(),
})

storiesOf('Components/SearchBar', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([EnhancedSearchBar]),
      propTables: [SearchBar],
      excludedPropTypes: ['className'],
    },
  })
  .add(
    'default',
    () => <EnhancedSearchBar {...getDefaultProps()} />,
    getSnippetTemplate(getSearchBarSnippet()),
  )
  .add(
    'ghost',
    () => <EnhancedSearchBar ghost {...getDefaultProps()} />,
    getSnippetTemplate(
      getSearchBarSnippet(`
    ghost`),
    ),
  )
  .add(
    'disabled',
    () => <EnhancedSearchBar disabled />,
    getSnippetTemplate(
      getSearchBarSnippet(`
    disabled`),
    ),
  )
  .add(
    'disabled ghost',
    () => <EnhancedSearchBar disabled ghost />,
    getSnippetTemplate(
      getSearchBarSnippet(`
    disabled
    ghost`),
    ),
  )
  .add(
    'updating the state',
    () => <SearchBarApp />,
    getSnippetTemplate(`
  class SearchBarApp extends PureComponent {
    constructor(props) {
      super(props)
      this.searchRef = React.createRef()
    }

    state = {
      options: ['Search Result 1', 'Search Result 2'],
    }

    render() {
      return (
        <>
          <EnhancedSearchBar
            wrappedRef={el => {
              this.searchRef = el
            }}
            {...{
              onSubmit: action('submit'),
              placeholder: getTextKnob({
                defaultText: 'Search…',
                name: 'placeholder',
              }),
              options: this.state.options,
            }}
          />
          <Button
            style={{ marginLeft: '20px' }}
            onClick={() => {
              this.searchRef.setState({
                value: '',
              })
            }}
          >
            Clear
          </Button>
          <Button
            style={{ marginLeft: '20px' }}
            onClick={() => {
              this.setState({
                options: [
                  ...this.state.options,
                  'Search Result ' + this.state.options.length,
                  'Search Result ' + this.state.options.length,
                ],
              })
            }}
          >
            Add options
          </Button>
        </>
      )
    }
  }
    `),
  )
