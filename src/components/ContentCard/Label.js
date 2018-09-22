import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LabelWrapper = styled.div`
  text-align: left;
  &:first-child {
    margin-right: 15px;
  }
  &:nth-child(2) {
    margin-left: 15px;
    text-align: right;
  }
  margin-top: 19px;
  font-size: 14px;
  div {
    font-size: 12px;
  }
`

const Label = ({ name, value }) => (
  <LabelWrapper>
    <div>{name}</div>
    <strong>{value}</strong>
  </LabelWrapper>
)

Label.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Label
