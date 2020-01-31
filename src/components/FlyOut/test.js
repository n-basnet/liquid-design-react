import FlyOut from '.'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('FlyOut', () => {
  const label = 'Some label'
  const getFlyOutWrapper = getWrapper(FlyOut, { label })
  it('renders a label', () => {
    expect(
      getFlyOutWrapper()
        .find(FlyOut)
        .html(),
    ).toMatch(label)
  })

  everyComponentTestSuite(getFlyOutWrapper, FlyOut, 'FlyOut')
})
