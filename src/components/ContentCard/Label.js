import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const LabelWrapper = styled.div`
  ${props => css`
    text-align: ${props.isRight ? 'right' : 'left'};
  `};
  margin-top: 19px;
  font-size: 14px;
  div {
    font-size: 12px;
  };
`

const Label = ({name, value, isRight}) =>
  <LabelWrapper isRight={isRight}>
    <div>{name}</div>
    <strong>{value}</strong>
  </LabelWrapper>

Label.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isRight: PropTypes.bool,
}

export default Label
