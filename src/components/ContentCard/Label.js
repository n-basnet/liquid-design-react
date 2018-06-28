import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const LabelWrapper = styled.div([
  props => css`
    text-align: ${props.isRight ? 'right' : 'left'};
  `,
])

const Label = ({name, value, isRight}) =>
  <LabelWrapper isRight={isRight}>
    {name}
    <br />
    <strong>{value}</strong>
  </LabelWrapper>

Label.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isRight: PropTypes.bool,
}

export default Label
