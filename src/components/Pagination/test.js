import React from 'react'
import Pagination, { PaginationWrapper } from '.'

import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'
import { times } from '~/utils/misc'

const children = times(400).map(item => <div key={item} />)

describe('Pagination', () => {
  const defaultProps = {
    children,
  }
  const getPaginationWrapper = getWrapper(Pagination, defaultProps)

  everyComponentTestSuite(getPaginationWrapper, PaginationWrapper, 'Pagination')
})
