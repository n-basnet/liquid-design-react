import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import { cursorValue } from '~/utils/styling'

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

const Step = ({ halfIcon, dots, ...props }) => (
  <StyledStep {...props} dots={dots}>
    <Icon
      name={`${dots ? 'dot' : 'star'}${halfIcon ? 'Half' : ''}`}
      size={20}
      color={props.rated ? '' : 'darkGrey'}
    />
  </StyledStep>
)

Step.propTypes = {
  halfIcon: PropTypes.bool,
  dots: PropTypes.bool,
  rated: PropTypes.bool,
}

export default Step
