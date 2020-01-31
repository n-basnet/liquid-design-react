import RadioButton from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'

describe('RadioButton', () => {
  const value = 'someValue'
  const getRadioButtonWrapper = getWrapper(RadioButton, {
    label: 'Some title',
    selected: value,
    value,
    onClick: jest.fn(),
  })
  everyComponentTestSuite(getRadioButtonWrapper, RadioButton, 'RadioButton')
})
