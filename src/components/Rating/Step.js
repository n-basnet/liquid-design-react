import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Glyph, ICON_CLASSNAME } from '../../elements/Icon'
import { cursorValue } from '../../utils/styling'

const StyledStep = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  ${cursorValue};

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `};
  ${props =>
    props.disabled &&
    css`
      opacity: 0.6;
    `};

  .${ICON_CLASSNAME} svg {
    ${props => css`
      path ${!props.dots && '+ path'} {
        fill: ${props.theme.colors.primary[props.hovered ? 'dark' : 'base']};
      }
      ${props =>
        props.hovered &&
        css`
          fill: ${props.theme.colors.primary.dark};
        `};
    `};
  }
`

const Step = ({ isHalfIcon, dots, ...props }) => (
  <StyledStep {...props} dots={dots}>
    <Glyph
      name={`${dots ? 'dot' : 'star'}${isHalfIcon ? 'Half' : ''}`}
      size={20}
      color={props.rated ? undefined : 'sensitiveGrey.darkest'}
    />
  </StyledStep>
)

Step.propTypes = {
  isHalfIcon: PropTypes.bool,
  dots: PropTypes.bool,
  rated: PropTypes.bool,
}

Step.defaultProps = {
  isHalfIcon: false,
  dots: false,
  rated: false,
}

export default Step
