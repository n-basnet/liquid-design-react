import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from '~/utils/styling'
import ModalHeader from '~/components/Modal/ModalHeader'

const ModalContentWrapper = styled.div`
  padding: 20px 30px;
  ${media.min.phone`
    padding: 35px 50px 50px;
  `};
`

const ModalContent = ({ label, onClose, children, theme, ...props }) => (
  <div {...props}>
    <ModalHeader label={label} onClose={onClose} />
    <ModalContentWrapper>{children}</ModalContentWrapper>
  </div>
)

ModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
}

ModalContent.defaultProps = {
  label: ModalHeader.defaultProps.label,
}

export default ModalContent
