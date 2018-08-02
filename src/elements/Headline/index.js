import React from 'react'
import PropTypes from 'prop-types'

import * as H from '~/elements/Headline/H'
import * as BH from '~/elements/Headline/BH'

const Headline = ({ children, type }) => {
  const HEADLINES = {
    ...H,
    ...BH,
  }

  const HeadlineComponent = HEADLINES[type]

  return <HeadlineComponent>{children}</HeadlineComponent>
}

Headline.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
}

Headline.defaultProps = {
  type: 'XH1',
}

export default Headline
