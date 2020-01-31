import LinearProgressBar from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'

describe('LinearProgressBar', () => {
  const getLinearProgressBarWrapper = getWrapper(LinearProgressBar)
  everyComponentTestSuite(
    getLinearProgressBarWrapper,
    LinearProgressBar,
    'LinearProgressBar',
  )
})
