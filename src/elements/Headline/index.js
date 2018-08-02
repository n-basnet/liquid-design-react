import React from 'react'
import PropTypes from 'prop-types'

import * as H from '~/elements/Headline/H'
import * as BH from '~/elements/Headline/BH'

const Headline = ({ children, size }) => {
  const HEADLINES = {
    ...H,
    ...BH,
  }

  const HeadlineComponent = HEADLINES[size]

  return <HeadlineComponent>{children}</HeadlineComponent>
}

Headline.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
}

Headline.defaultProps = {
  size: 'H1',
}

export default Headline
