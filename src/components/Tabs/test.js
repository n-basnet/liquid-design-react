import Tabs from '.'
import TabHead from '~/components/Tabs/TabHead'
import TabContent from '~/components/Tabs/TabContent'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Tabs', () => {
  const defaultProps = {
    tabsData: [
      {
        id: 1,
        name: 'Tab Head 1',
        content: 'Tab Content 1',
      },
      {
        id: 2,
        name: 'Tab Head 2',
        content: 'Tab Head 2',
      },
    ],
  }
  const getDropdownWrapper = getWrapper(Tabs, defaultProps)

  const wrapper = getDropdownWrapper()

  it('renders 2 tab heads', () => {
    expect(wrapper.find(TabHead).length).toBe(2)
  })

  it('renders 2 tab contents', () => {
    expect(wrapper.find(TabContent).length).toBe(2)
  })

  it('renders a tab head text correctly', () => {
    expect(
      wrapper
        .find(TabHead)
        .first()
        .text()
    ).toEqual(defaultProps.tabsData[0]['name'])
  })

  it('renders a tab content text correctly', () => {
    expect(
      wrapper
        .find(TabContent)
        .first()
        .text()
    ).toEqual(defaultProps.tabsData[0]['content'])
  })

  everyComponentTestSuite(getDropdownWrapper, Tabs, 'Tabs')
})
