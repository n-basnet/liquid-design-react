import Navigation from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'
import NavigationLink from './NavigationLink'
import { Glyph } from '../../elements/Icon'

describe('Navigation', () => {
  const onClickFn = jest.fn()
  const title = 'Navbar title'
  const href = 'http://test.url'
  const navIconName = 'instagram'
  const defaultProps = {
    title,
    iconName: navIconName,
    tabs: [
      {
        title: 'Search glyph',
        iconName: 'search',
        href, // fist tab contains href
      },
      {
        title: 'Search glyph',
        iconName: 'search',
        onClick: onClickFn, // second one contains onClick handler
      },
    ],
  }
  const getNavigationWrapper = getWrapper(Navigation, defaultProps)
  everyComponentTestSuite(getNavigationWrapper, Navigation, 'Navigation')
  const wrapper = getNavigationWrapper()

  it('displays exacty two NavigationLink components', () => {
    expect(wrapper.find(NavigationLink)).toHaveLength(2)
  })

  it('displays proper Navigation title ', () => {
    expect(wrapper.contains(title)).toEqual(true)
  })

  it('displays selected Glyph as last item in Navigation, when iconName is passed', () => {
    expect(
      wrapper
        .find(Glyph)
        .at(2)
        .prop('name'),
    ).toEqual(navIconName)
  })

  it('displays proper url for first link', () => {
    expect(
      wrapper
        .find(NavigationLink)
        .at(0)
        .prop('href'),
    ).toEqual(href)
  })

  it('handles onClick events properly', () => {
    // simulate click on second tab
    wrapper
      .find(NavigationLink)
      .at(1)
      .simulate('click')
    expect(onClickFn).toHaveBeenCalledTimes(1)
  })
})
