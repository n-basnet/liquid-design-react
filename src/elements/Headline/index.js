import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import * as H from '../../elements/Headline/H'
import * as BH from '../../elements/Headline/BH'
import attachClassName from '../../components/misc/hoc/attachClassName'

const HEADLINES = {
  ...H,
  ...BH,
}

export const Headline = ({ children, className, type, ...props }) => {
  const HeadlineComponent = HEADLINES[type]

  return (
    <HeadlineComponent
      className={cx(className, `${className}--${type}`)}
      {...props}
    >
      {children}
    </HeadlineComponent>
  )
}

export const HEADLINE_TYPES = Object.keys(HEADLINES)

Headline.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(HEADLINE_TYPES),
  style: PropTypes.object,
  className: PropTypes.string,
}

Headline.defaultProps = {
  type: 'H1',
  style: null,
  className: null,
}

const { Component, globalClassName } = attachClassName(Headline)

export const HEADLINE_CLASSNAME = globalClassName

export default Component
