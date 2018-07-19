import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'

const ModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 17px 15px 13px 15px;
  ${props => css`
    background-color: ${props.theme.colors.grey.base};
  `};
`

const ModalHeader = ({ label, onClose }) => (
  <ModalHeaderWrapper>
    <div>{label}</div>
    <Icon name='close' size={20} onClick={onClose} />
  </ModalHeaderWrapper>
)

ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string,
}

export default ModalHeader
