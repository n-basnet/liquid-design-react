import ContentCard from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'

describe('ContentCard', () => {
  const getContentCardWrapper = getWrapper(ContentCard, { title: 'Some title' })
  everyComponentTestSuite(getContentCardWrapper, ContentCard, 'ContentCard')
})
