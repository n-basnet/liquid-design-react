import React from 'react'
import PropTypes from 'prop-types'
import { pick, omit } from 'ramda'
import { withTheme } from 'styled-components'
import cx from 'classnames'

import PlaceholderCircular from '../../assets/svgIllustrations/placeholder/circular.svg'
import PlaceholderCircularWhite from '../../assets/svgIllustrations/placeholder/circular-white.svg'
import PlaceholderSquare from '../../assets/svgIllustrations/placeholder/square.svg'
import PlaceholderRectangular from '../../assets/svgIllustrations/placeholder/rectangular.svg'
import { getClassName } from '../../components/misc/hoc/attachClassName'
import { getFirstTruthyKeyName } from '../../utils/misc'

export const PLACEHOLDER_CLASSNAME = getClassName({ name: 'Placeholder' })

const PlaceholderImages = {
  isCircularWhite: PlaceholderCircularWhite,
  isSquare: PlaceholderSquare,
  isRectangular: PlaceholderRectangular,
  isCircular: PlaceholderCircular,
}

const DEFAULT_TYPE = 'isCircular'

export const Placeholder = ({
  width,
  height,
  theme,
  className,
  style,
  ...props
}) => {
  const typeProps = Object.keys(PlaceholderImages)
  const type = getFirstTruthyKeyName(pick(typeProps, props)) || DEFAULT_TYPE
  const PlaceholderComponent = PlaceholderImages[type]
  return (
    <PlaceholderComponent
      width={`${width}px`}
      style={{
        maxWidth: '100%',
        height: height || 'auto',
        ...(type.indexOf('Circular') === -1 &&
          theme && { backgroundColor: theme.colors.sensitiveGrey.base }),
        ...style,
      }}
      className={cx(className, PLACEHOLDER_CLASSNAME)}
      {...omit(typeProps, props)}
    />
  )
}

Placeholder.propTypes = {
  width: PropTypes.number,
  /** if not set, 'auto' value will be used */
  height: PropTypes.number,
  isSquare: PropTypes.bool,
  isRectangular: PropTypes.bool,
  isCircularWhite: PropTypes.bool,
  /** (provided by `styled-components` via withTheme decorator) */
  theme: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

Placeholder.defaultProps = {
  width: 150,
  height: null,
  isSquare: false,
  isRectangular: false,
  isCircularWhite: false,
  theme: null,
  className: null,
  style: {},
}

export default withTheme(Placeholder)
