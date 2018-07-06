import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import Icon from '~/components/aux/Icon'

const StyledStep = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  ${props => props.onClick && css`
    cursor: pointer;
  `};
  ${props => props.disabled && css`
    opacity: 0.6;
  `};

  & > svg {
    ${props => css`
        fill: ${props.theme.colors.darkGrey};
        path ${!props.dots && '+ path'} {
          fill: ${props.hovered ? props.theme.colors.primary.dark : props.theme.colors.primary.base};
        };
        ${props => props.rated && css`
          fill: ${props.theme.colors.primary.base};
        `};
        ${props => props.hovered && css`
          fill: ${props.theme.colors.primary.dark};
        `};
      `};
  };
`

const Step = ({ halfIcon, dots, ...props }) =>
  <StyledStep {...props} dots={dots}>
    <Icon name={`${dots ? 'dot' : 'star'}${halfIcon ? 'Half' : ''}`} size={20} />
  </StyledStep>

Step.propTypes = {
  halfIcon: PropTypes.bool,
  dots: PropTypes.bool,
}

export default Step