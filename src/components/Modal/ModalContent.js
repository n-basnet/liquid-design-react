import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from '~/utils/styling'
import ModalHeader from '~/components/Modal/ModalHeader'

const ModalContentWrapper = styled.div`
  padding: 20px;
  ${media.min.phone`
    padding: 35px 50px 50px;
  `};
`

const ModalContent = ({ label, onClose, children }) => (
  <Fragment>
    <ModalHeader label={label} onClose={onClose} />
    <ModalContentWrapper>{children}</ModalContentWrapper>
  </Fragment>
)

ModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ModalContent.defaultProps = {
  label: ModalHeader.defaultProps.label,
}

export default ModalContent
