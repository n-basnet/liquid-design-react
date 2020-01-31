/* eslint-disable react/prop-types */

import React from 'react'
import cx from 'classnames'

import { GLOBAL_CSS_PREFIX } from '../../../utils/consts'

export const getClassName = Component =>
  `${GLOBAL_CSS_PREFIX}${Component.displayName || Component.name}`

export default Component => {
  const globalClassName = getClassName(Component)
  return {
    globalClassName,
    Component: ({ className, ...props }) => (
      <Component className={cx(globalClassName, className)} {...props} />
    ),
  }
}
