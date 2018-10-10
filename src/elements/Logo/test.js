import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

import Logo from '.'

describe('Logo', () => {
  const getLabelWrapper = getWrapper(Logo, { color: '#000000', theme: {} })

  everyComponentTestSuite(getLabelWrapper, Logo, 'Logo')
})
