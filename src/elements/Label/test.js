import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

import Label from '.'

describe('Label', () => {
  const defaultProps = {
    children: 'Label Text',
  }
  const getLabelWrapper = getWrapper(Label, defaultProps)

  it('renders the link text', () => {
    const wrapper = getLabelWrapper()
    expect(wrapper.find(Label).text()).toEqual(defaultProps.children)
  })

  everyComponentTestSuite(getLabelWrapper, Label, 'Label')
})
