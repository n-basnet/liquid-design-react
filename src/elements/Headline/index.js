import React from 'react'
import PropTypes from 'prop-types'

import * as H from '~/elements/Headline/H'
import * as BH from '~/elements/Headline/BH'

const Headline = ({ children, type, style }) => {
  const HEADLINES = {
    ...H,
    ...BH,
  }

  const HeadlineComponent = HEADLINES[type]

  return <HeadlineComponent style={style}>{children}</HeadlineComponent>
}

Headline.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  style: PropTypes.object,
}

Headline.defaultProps = {
  type: 'H1',
  style: null,
}

export default Headline
