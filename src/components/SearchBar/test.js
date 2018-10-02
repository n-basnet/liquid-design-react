import SearchBar, { DEFAULT_PLACEHOLDER_TEXT, ResultWrapper } from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('SearchBar', () => {
  let wrapper
  let getInput
  const query = 'Search result'
  const OPTIONS = [`${query} 1`, `${query} 1`]
  const getSearchBarWrapper = getWrapper(SearchBar, { options: OPTIONS })
  beforeEach(() => {
    wrapper = getSearchBarWrapper()
    getInput = () => wrapper.find('input')
  })
  it('renders placeholder text', () => {
    expect(getInput().prop('placeholder')).toEqual(DEFAULT_PLACEHOLDER_TEXT)
  })
  it('updates value', () => {
    expect(getInput().prop('value')).toEqual('')
    getInput().simulate('change', { target: { value: query } })
    expect(getInput().prop('value')).toEqual(query)
  })
  it('displays results', () => {
    expect(wrapper.find(ResultWrapper).length).toEqual(0)
    getInput().simulate('change', { target: { value: query } })
    expect(
      wrapper
        .find(ResultWrapper)
        .first()
        .text()
    ).toEqual(OPTIONS[0])
    expect(wrapper.find(ResultWrapper).length).toEqual(OPTIONS.length)

    getInput().simulate('change', {
      target: { value: 'will not find anything' },
    })
    expect(wrapper.find(ResultWrapper).length).toEqual(0)
  })

  everyComponentTestSuite(getSearchBarWrapper, SearchBar, 'SearchBar')
})
