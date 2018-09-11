import React from 'react'
import PropTypes from 'prop-types'

import * as H from '~/elements/Headline/H'
import * as BH from '~/elements/Headline/BH'
import attachClassName from '~/components/aux/hoc/attachClassName'

export const Headline = ({ children, type, ...props }) => {
  const HEADLINES = {
    ...H,
    ...BH,
  }

  const HeadlineComponent = HEADLINES[type]

  return <HeadlineComponent {...props}>{children}</HeadlineComponent>
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

const { Component } = attachClassName(Headline)

export default Component
