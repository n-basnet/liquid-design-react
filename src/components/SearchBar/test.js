import SearchBar, { PLACEHOLDER_TEXT, ResultWrapper } from '.'
import Input from '~/components/aux/Input'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('SearchBar', () => {
  let wrapper
  let getInput
  const query = 'Search result'
  const OPTIONS = [{ text: `${query} 1` }, { text: `${query} 1` }]
  const getSearchBarWrapper = getWrapper(SearchBar, { options: OPTIONS })
  beforeEach(() => {
    wrapper = getSearchBarWrapper()
    getInput = () => wrapper.find(Input)
  })
  it('renders placeholder text', () => {
    expect(wrapper.find(Input).prop('placeholder')).toEqual(PLACEHOLDER_TEXT)
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
    ).toEqual(OPTIONS[0].text)
    expect(wrapper.find(ResultWrapper).length).toEqual(OPTIONS.length)

    getInput().simulate('change', {
      target: { value: 'will not find anything' },
    })
    expect(wrapper.find(ResultWrapper).length).toEqual(0)
  })

  everyComponentTestSuite(getSearchBarWrapper, SearchBar, 'SearchBar')
})
