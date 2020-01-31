import Header from '.'
import Label from '../../elements/Label'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Header', () => {
  const defaultProps = {
    labelOne: 'Room 01',
    labelTwo: 'Room 02',
    withText: true,
  }
  const getHeaderWrapper = getWrapper(Header, defaultProps)
  const wrapper = getHeaderWrapper()

  it('renders the text correctly', () => {
    expect(
      wrapper
        .find(Label)
        .first()
        .text(),
    ).toBe(defaultProps.labelOne)

    expect(
      wrapper
        .find(Label)
        .at(1)
        .text(),
    ).toBe(defaultProps.labelTwo)
  })

  everyComponentTestSuite(getHeaderWrapper, Header, 'Header')
})
